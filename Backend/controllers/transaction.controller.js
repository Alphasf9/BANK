import mongoose from "mongoose";
import { Account } from "../models/account.model.js";
import { Transaction } from "../models/transaction.model.js";
import { Card } from "../models/card.model.js";


const debit = async (req, res) => {
    const { fromAccount, amount, description } = req.body;

    if (!fromAccount || !amount) {
        return res.status(400).json({ message: "Please provide all the details" });
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const account = await Account.findOne({ accountNumber: fromAccount }).session(session);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Update account balance
        account.balance -= amount;
        await account.save({ session });

        // Log successful transaction
        const transaction = new Transaction({
            transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            fromAccount,
            type: "Debit",
            amount,
            description,
            status: "Completed",
        });
        await transaction.save({ session });

        await session.commitTransaction();
        return res.status(201).json({ transaction, message: "Transaction successful" });

    } catch (error) {
        await session.abortTransaction();

        const failedTransaction = new Transaction({
            transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            fromAccount,
            type: "Debit",
            amount,
            description,
            status: "Failed",
        });
        await failedTransaction.save();

        return res.status(500).json({ transaction: failedTransaction, message: error.message || "Transaction failed" });

    } finally {
        session.endSession();
    }
};


const credit = async (req, res) => {
    const { toAccount, amount, description } = req.body;
    if (!toAccount || !amount) {
        return res.status(400).json({ message: "Please provide all the details" });
    }
    const session = await mongoose.startSession();

    try {

        session.startTransaction();
        const account = await Account.findOne({ accountNumber : toAccount }).session(session);

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        account.balance += amount;
        await account.save({ session });


        const transaction = new Transaction({
            transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            toAccount,
            type: "Credit",
            amount,
            description,
            status: "Completed",
        })
        await transaction.save({ session });

        await session.commitTransaction();

        return res.status(201).json({ transaction, message: "Transaction successful" });

    } catch (error) {
        const failedTransaction = new Transaction({
            transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            toAccount,
            type: "Credit",
            amount,
            description,
            status: "Failed",
        })
        await failedTransaction.save();

        await session.abortTransaction();

        return res.status(500).json({ failedTransaction, message: "Transaction failed" });
    } finally {
        session.endSession();
    }
}

const transfer = async (req, res) => {
    const session = await mongoose.startSession();
    const { fromAccount, toAccount, amount, description } = req.body;
    if (!fromAccount || !toAccount || !amount) {
        return res.status(400).json({ message: "Please provide all the details" });
    }

    try {

        session.startTransaction();

        const sender = await Account.findOne({ accountNumber: fromAccount });
        if (!sender) {
            return res.status(404).json({ message: "Sender account not found" });
        }

        const receiver = await Account.findOne({ accountNumber: toAccount });
        if (!receiver) {
            return res.status(404).json({ message: "Receiver account not found" });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        sender.balance -= amount;
        await sender.save({ session });
        // console.log(sender);
        

        receiver.balance += amount;
        await receiver.save({ session });

        const transaction = new Transaction({
            transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            fromAccount,
            toAccount,
            type: "Transfer",
            amount,
            description,
            status: "Completed",
        })

        await transaction.save({ session });

        await session.commitTransaction();

        return res.status(201).json({ transaction, message: "Transaction successful" });

    } catch (error) {
        const transaction = new Transaction({
            transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            fromAccount,
            toAccount,
            type: "Transfer",
            amount,
            description,
            status: "Failed",
        });
        await transaction.save();

        await session.abortTransaction();

        return res.status(500).json({ transaction, message: "Transaction failed" });
    } finally {
        session.endSession();
    }

}

const cardTransaction = async (req, res) => {
    const { cardNumber, amount, description, type, pin } = req.body;
    if (!cardNumber || !amount || !type || !pin) {
        return res.status(400).json({ message: "Please provide all the details" });
    }

    const session = await mongoose.startSession();

    try {
        
        session.startTransaction();

        const card = await Card.findOne({ cardNumber }).session(session);
        if(!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        if(card.pin !== pin) {
            return res.status(400).json({ message: "Invalid PIN" });
        }

        if(card.cardStatus !== "Active") {
            return res.status(400).json({ message: "Card is not active" });
        }

        if(new Date(card.expiryDate) < new Date()) {
            return res.status(400).json({ message: "Card has expired" });
        }

        const account = await Account.findOne({ accountNumber: card.accountNumber }).session(session);
        if(!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if(type === "Debit" && account.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        if(type === "Debit") {
            account.balance -= amount;
        } else if(type === "Credit") {
            account.balance += amount;
        } else {
            return res.status(400).json({ message: "Invalid transaction type" });
        }

        await account.save({ session });

        const transaction = new Transaction({
            transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            accountNumber: card.accountNumber,
            type,
            amount,
            description,
            status: "Completed",
        })
        await transaction.save({ session });

        await session.commitTransaction();

        return res.status(201).json({ transaction, message: "Transaction successful" });

    } catch (error) {
        const card = await Card.findOne({ cardNumber });
        const transaction = new Transaction({
            transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            accountNumber: card.accountNumber,
            type: "Transfer",
            amount,
            description,
            status: "Failed",
        });
        await transaction.save();

        await session.abortTransaction();

        return res.status(500).json({ transaction, message: "Transaction failed" });
    } finally {
        session.endSession();
    } 
}

export { debit, credit, transfer, cardTransaction };
