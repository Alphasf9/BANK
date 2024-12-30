import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'



const sendMail = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'ha7496154@gmail.com',
            pass: 'tzuskogrqjmefzxx'
        },
    });
    
    const otp = Math.floor(Math.random() * 900000) + 100000; // 6-digit OTP
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    console.log(hashedOtp);


    const otpExpiry = Date.now() + 5 * 60 * 1000;  // OTP expires in 5 minutes


    req.session.otp = { code: hashedOtp, expiry: otpExpiry };


    async function main() {
        const info = await transporter.sendMail({
            from: '"Developers 👻" <developerhaseeb1234@gmail.com>', // sender address
            to: "mh6912641@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<h1 style="color: blue;">Welcome to Our Service!</h1>
            <p style="font-size: 18px;">Your verification code for changing your password is <strong>${otp}</strong></p>`
            // html body
        });

        console.log("Message sent: %s", info.messageId);
    }

    main().catch(console.error);
}

export default sendMail ;