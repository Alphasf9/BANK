import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const sendMail = async (req) => {

    const{email}= req.session.userDetails;
    if (!email) {
        throw new Error("Email is missing from session details");
    }
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'ha7496154@gmail.com',
            pass: 'tzuskogrqjmefzxx',
        },
    });

    const otp = Math.floor(Math.random() * 900000) + 100000; // 6-digit OTP
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    // console.log("Hashed OTP:", hashedOtp);

    const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
    req.session.otp = { code: hashedOtp, expiry: otpExpiry };

    const recipients = [
        "mh6912641@gmail.com",
        "rajaryankumar26april@gmail.com",
        "krishnakantyadav853@gmail.com",
    ];

    const results = [];

    for (const recipient of recipients) {
        try {
            const info = await transporter.sendMail({
                from: '"Developers 👻" <ha7496154@gmail.com>', // sender address
                to: email, // single recipient
                subject: "Your OTP Verification Code", // Subject line
                html: `<h1 style="color: blue;">Welcome to Our Service!</h1>
                       <p style="font-size: 18px;">Your verification code for changing your password is <strong>${otp}</strong></p>` // HTML body
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
