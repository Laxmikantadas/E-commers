const nodemailer = require('nodemailer');
require('dotenv').config();

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
};

const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Varify your OTP',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};
const otpStore = new Map();

const storeOTP = (email, otp) => {
    otpStore.set(email, {
        otp,
        expires: Date.now() + 300000, 
    });
};

const verifyOTP = (email, otp) => {
    const storedOTP = otpStore.get(email);
    if (!storedOTP) {
        return false; 
    }
    const { otp: storedOtp, expires } = storedOTP;
    if (Date.now() > expires) {
        otpStore.delete(email);
        return false;
    }
    if (storedOtp !== otp) {
        return false; 
    }
    otpStore.delete(email); 
    return true; 
};

module.exports = {
    generateOTP,
    sendOTP,
    storeOTP,
    verifyOTP,
};
