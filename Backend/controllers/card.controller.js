<<<<<<< HEAD
import { Account } from "../models/account.model.js";
import { Card } from "../models/card.model.js";
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

export { issueCard, generateCardPin };
=======
    import { Account } from "../models/account.model.js";
    import { Card } from "../models/card.model.js";


    const issueCard = async (req, res) => {
        const { accountNumber, cardHolderName, cardType } = req.body;

        if (!accountNumber || !cardHolderName || !cardType) {
            return res.status(400).json({ message: "Please provide all the details" });
        }

        if(cardType !== "Virtual Card" && cardType !== "Debit Card"&& cardType !== "Credit Card") {
            return res.status(400).json({ message: "Invalid card type" });
        }


        try {

            const account = await Account.findOne({ accountNumber });
            if (!account) {
                return res.status(404).json({ message: "Account not found" });
            }
            

            const cardCheck = account.isCard;
           
           let cardAlreadyIssued =false;

            cardCheck.forEach((card) => {
                if(card === cardType) {
                    cardAlreadyIssued = true;
                }
            })
            
            if(cardAlreadyIssued) {
                return res.status(400).json({ message: "Card already issued" });
            }
            
            
            const cardNumber = Math.floor(10 ** 15 + Math.random() * 9 * 10 ** 15).toString(); // 16-digit card number
            const cvv = String(Math.floor(100 + Math.random() * 900)); // 3-digit CVV
            const pin = String(Math.floor(1000 + Math.random() * 9000)); // 4-digit PIN

            const expiryDate = new Date();
            expiryDate.setFullYear(expiryDate.getFullYear() + 5);

            account.isCard.push(cardType);
            await account.save();

            const card = new Card({
                accountNumber,
                cardNumber,
                cardHolderName,
                cardType,
                expiryDate,
                cvv,
                pin,
                cardStatus: "Active",
            });
            await card.save();


            return res.status(201).json({
                card: {
                    cardNumber,
                    cardType,
                    cardHolderName,
                    expiryDate,
                    cardStatus: card.cardStatus,
                }, message: "Card issued successfully"
            });

        } catch (error) {
            console.error("Error issuing card:", error);
            return res.status(500).json({ message: "Failed to issue card", error: error.message });
        }
    }

    export { issueCard };
>>>>>>> 18f2ea88fee6744e53dc840208d891274e5e9242
