import { Account } from "../models/account.model.js";
import { Card } from "../models/card.model.js";


const issueCard = async (req, res) => {
    const { accountNumber, cardHolderName, cardType } = req.body;

    if (!accountNumber || !cardHolderName || !cardType) {
        return res.status(400).json({ message: "Please provide all the details" });
    }

    try {

        const account = await Account.findOne({ accountNumber });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        const cardNumber = Math.floor(10 ** 15 + Math.random() * 9 * 10 ** 15).toString(); // 16-digit card number
        const cvv = String(Math.floor(100 + Math.random() * 900)); // 3-digit CVV
        const pin = String(Math.floor(1000 + Math.random() * 9000)); // 4-digit PIN

        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 5);

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