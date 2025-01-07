import { Account } from "../models/account.model.js";
import { Card } from "../models/card.model.js";
import { User } from "../models/user.model.js";
import sendMail from "../utils/mailVerification.js";
import bcrypt from "bcrypt";

// Controller to issue a card
const issueCard = async (req, res) => {
    const { accountNumber, email, cardHolderName, cardType } = req.body;

    if (!accountNumber || !cardHolderName || !cardType || !email) {
        return res.status(400).json({ message: "Please provide all the details" });
    }

    if (!["Virtual Card", "Debit Card", "Credit Card"].includes(cardType)) {
        return res.status(400).json({ message: "Invalid card type" });
    }

    try {
        const account = await Account.findOne({ accountNumber });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.isCard.includes(cardType)) {
            return res.status(400).json({ message: "Card already issued" });
        }

        // Generate a card number and CVV but do not save yet
        const cardNumber = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join(""); // Generate 16-digit card number
        const cvv = String(Math.floor(100 + Math.random() * 900)); // Generate 3-digit CVV
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 5);

        // Store the card in session temporarily
        req.session.cardDetails = {
            accountNumber,
            cardNumber,
            cardHolderName,
            cardType,
            expiryDate,
            cvv,
        };

        req.session.userDetails = {
            accountNumber,
            email,
        };

        // Send OTP for PIN generation
        await sendMail(req);

        return res.status(201).json({
            message: "Card issued successfully. OTP sent for PIN generation.",
        });
    } catch (error) {
        console.error("Error issuing card:", error);
        return res.status(500).json({ message: "Failed to issue card", error: error.message });
    }
};

// Controller to generate PIN
const generateCardPin = async (req, res) => {
    const { otp, newPin } = req.body;

    if (!otp || !newPin) {
        return res.status(400).json({ message: "OTP and new PIN are required" });
    }

    if (!/^\d{4}$/.test(newPin)) {
        return res.status(400).json({ message: "PIN must be a 4-digit number" });
    }

    try {
        const { accountNumber } = req.session.userDetails || {};
        if (!accountNumber) {
            return res.status(400).json({ message: "Session expired. Please retry the process." });
        }

        const sessionOtp = req.session.otp;
        if (!sessionOtp) {
            return res.status(401).json({ message: "OTP session has expired or does not exist" });
        }

        const { code: hashedOtp, expiry } = sessionOtp;

        if (Date.now() > expiry) {
            return res.status(401).json({ message: "OTP expired" });
        }

        const isMatch = await bcrypt.compare(otp.toString(), hashedOtp);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Retrieve card details from session
        const cardDetails = req.session.cardDetails;
        if (!cardDetails) {
            return res.status(404).json({ message: "Card details are missing" });
        }

        const hashedPin = await Card.hashPassword(newPin);

        // Create the card and save it
        const card = new Card({
            accountNumber,
            ...cardDetails, // Extract card details from session
            pin: hashedPin,
            cardStatus: "Active",
        });

        await card.save();

        // Update the account with the issued card type
        const account = await Account.findOne({ accountNumber });
        account.isCard.push(cardDetails.cardType);
        await account.save();

        // Clear session data after success
        req.session.userDetails = null;
        req.session.otp = null;
        req.session.cardDetails = null;

        return res.status(200).json({ message: "PIN generated successfully. Card activated." });
    } catch (error) {
        console.error("Error generating PIN:", error);
        res.status(500).json({ message: "Failed to generate PIN", error: error.message });
    }
};

const changeCardPin = async (req, res) => {
    const { email, accountNumber, cardType, oldPin, newPin } = req.body;

    if (!email || !accountNumber || !oldPin || !newPin || !cardType) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!["Debit Card", "Credit Card", "Virtual Card"].includes(cardType)) {
        return res.status(400).json({ message: "Invalid card type" });
    }

    if (newPin === oldPin) {
        return res.status(400).json({ message: "New PIN must be different from the old PIN" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const account = await Account.findOne({ accountNumber });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        const card = await Card.findOne({ accountNumber, cardType }).select("+pin");
        if (!card) {
            return res.status(404).json({ message: `No ${cardType} associated with this account` });
        }
        // console.log(card);
        

        const isPinMatch = await card.passwordCorrect(oldPin);
        if (!isPinMatch) {
            return res.status(400).json({ message: "Old PIN is incorrect" });
        }

        const newHashedPin = await Card.hashPassword(newPin);

        // Store hashed PIN and user details in the session
        req.session.cardDetails = {
            accountNumber,
            cardType,
            newHashedPin,
        };
        req.session.userDetails = { email };

        // Send OTP for PIN change
        await sendMail(req);

        return res.status(200).json({ message: "OTP sent for PIN change" });
    } catch (error) {
        console.error("Error during PIN change:", error);
        return res.status(500).json({ message: "Failed to initiate PIN change", error: error.message });
    }
};


const otpVerifyForPinChange = async (req, res) => {
    const { otp } = req.body;

    if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
    }

    try {
        const sessionOtp = req.session.otp;
        if (!sessionOtp) {
            return res.status(401).json({ message: "OTP session expired or does not exist" });
        }

        const { code: hashedOtp, expiry } = sessionOtp;

        if (Date.now() > expiry) {
            return res.status(400).json({ message: "OTP expired" });
        }

        const isMatch = await bcrypt.compare(otp.toString(), hashedOtp);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Retrieve card details from session
        const { accountNumber, cardType, newHashedPin } = req.session.cardDetails || {};
        if (!accountNumber || !cardType || !newHashedPin) {
            return res.status(400).json({ message: "Session data is missing or corrupted" });
        }

        const card = await Card.findOne({ accountNumber, cardType });
        if (!card) {
            return res.status(404).json({ message: `No ${cardType} associated with this account` });
        }
        // console.log(card);
        

        // Update card PIN
        card.pin = newHashedPin;
        await card.save();

        // Clear session data
        req.session.cardDetails = null;
        req.session.otp = null;

        return res.status(200).json({ message: "Card PIN changed successfully" });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({ message: "Failed to verify OTP", error: error.message });
    }
};

const blockCard = async (req, res) => {
    const { email, accountNumber, cardType, reason } = req.body;

    if (!email || !accountNumber || !cardType) {
        return res.status(400).json({ message: "Email, accountNumber, and cardType are required." });
    }

    if (!["Debit Card", "Credit Card", "Virtual Card"].includes(cardType)) {
        return res.status(400).json({ message: "Invalid card type." });
    }

    try {
        const account = await Account.findOne({ accountNumber });
        if (!account) {
            return res.status(404).json({ message: "Account not found or email mismatch." });
        }

        const card = await Card.findOne({ accountNumber, cardType });
        if (!card) {
            return res.status(404).json({ message: `No ${cardType} found for the account.` });
        }

        if (card.cardStatus === "Blocked") {
            return res.status(400).json({ message: "Card is already blocked." });
        }

        card.cardStatus = "Blocked";
        card.blockReason = reason || "User request"; // Optional reason
        await card.save();

        // Remove the card type from the account's isCard array
        account.isCard = account.isCard.filter((type) => type !== cardType);
        await account.save();

        return res.status(200).json({ 
            message: `${cardType} has been blocked successfully.`,
            card: {
                cardType: card.cardType,
                cardNumber: card.cardNumber,
                blockReason: card.blockReason,
                cardStatus: card.cardStatus,
            },
        });
    } catch (error) {
        console.error("Error blocking card:", error);
        return res.status(500).json({ message: "Failed to block the card.", error: error.message });
    }
};


export { issueCard, generateCardPin, changeCardPin, otpVerifyForPinChange, blockCard };