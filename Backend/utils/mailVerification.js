import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { TempUser } from '../models/tempusers.model.js';

const sendMail = async (req) => {
   
    if (!req.body || !req.body.email) {
        console.error('Email not provided in request body');
        return { error: 'Email is required' };
    }
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'ha7496154@gmail.com',
            pass: 'tzuskogrqjmefzxx',
        },
    });

    const otp = Math.floor(Math.random() * 900000) + 100000; 
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    const otpExpiry = Date.now() + 10 * 60 * 1000; 

    const tempUser = await TempUser.findOne({ email });


    if (tempUser) {
        tempUser.otp = hashedOtp;
        tempUser.otpExpiry = otpExpiry;
        await tempUser.save();
    }

    else {
        const newUser = new TempUser({
            email,
            otp: hashedOtp,
            otpExpiry,
        });
        await newUser.save();
    }

    const recipients = [email];

    const results = [];

    for (const recipient of recipients) {
        try {
            const info = await transporter.sendMail({
                from: '"Your Trusted Bank" <ha7496154@gmail.com>', // sender address
                to: email, // single recipient
                subject: "Secure OTP for Your Banking Service", // Subject line
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
                        <div style="text-align: center;">
                            <h2 style="color: #2d89ef; margin-bottom: 10px;">Your Trusted Bank</h2>
                            <p style="color: #555; font-size: 16px; margin: 5px 0;">Secure Online Banking</p>
                        </div>
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                        <div style="text-align: left;">
                            <p style="color: #333; font-size: 16px;">Dear Customer,</p>
                            <p style="color: #555; font-size: 16px; line-height: 1.5;">
                                We have received a request to verify your account for a secure transaction. Please use the OTP (One-Time Password) below to complete your verification process. This OTP is valid for 10 minutes.
                            </p>
                            <div style="background-color: #f9f9f9; padding: 15px; border: 1px dashed #2d89ef; text-align: center; margin: 20px 0;">
                                <span style="font-size: 24px; font-weight: bold; color: #2d89ef;">${otp}</span>
                            </div>
                            <p style="color: #555; font-size: 16px; line-height: 1.5;">
                                If you did not request this OTP, please ignore this email or contact our customer service team immediately.
                            </p>
                        </div>
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                        <div style="text-align: center; color: #999; font-size: 14px;">
                            <p>Thank you for choosing <strong>Your Trusted Bank</strong>.</p>
                            <p>For any assistance, please reach out to our <a href="#" style="color: #2d89ef; text-decoration: none;">Customer Support</a>.</p>
                        </div>
                    </div>`
            });

            results.push({ recipient, status: 'success', messageId: info.messageId });
        } catch (error) {
            console.error(`Error sending email to ${recipient}:`, error);
            results.push({ recipient, status: 'error', error: error.message });
        }
    }

    return results;
};

export default sendMail;
