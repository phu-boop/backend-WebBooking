require('dotenv').config();
var nodemailer = require('nodemailer');
import Redis from 'ioredis';

const redis = new Redis({
  host: 'redis-18238.c10.us-east-1-2.ec2.redns.redis-cloud.com',
  port: 18238,
  password: 'FEc2yW8UbDcUnFqRI1MAppTfXBaOtdsc',
  username: 'default',
});

redis.on('error', err => console.log('Redis Client Error', err));

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Lấy từ biến môi trường
    pass: process.env.EMAIL_PASS  // Lấy từ biến môi trường
  }
});

var sendMail = (to, subject, htmlContent) => {
  return new Promise((resolve, reject) => {
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: htmlContent 
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(info.response);
      }
    });
  });
};


// Hàm tạo mã OTP và lưu vào Redis
async function generateOTP(userId) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const redisKey = `otp:${userId}`;
  const ttl = 60; // 1 phút

  try {
    // Lưu OTP vào Redis
    await redis.setex(redisKey, ttl, otp);

    // Kiểm tra xem OTP đã được lưu thành công chưa
    const storedOTP = await redis.get(redisKey);
    if (storedOTP === otp) {
      console.log(`OTP ${otp} for user ${userId} stored successfully in Redis`);
      return otp;
    } else {
      throw new Error('Failed to store OTP in Redis: Stored value does not match');
    }
  } catch (err) {
    console.error('Error in generateOTP:', err.message);
    throw new Error('Could not generate and store OTP');
  }
}
async function createHtmlOTP(email) {
    const otp = await generateOTP(email); // Tạo mã OTP
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 1000px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: center; background-color: #003580; padding: 10px 20px; height: 60px;">
                <div href="#" style="color: white; font-size: 24px; font-weight: bold; font-family: Arial, sans-serif; text-decoration: none;">Booking.com</div>
            </div>
            <h2 style="color: #333; text-align: center;">Verify email and create an account</h2>
            <p style="color: #555;">Hi,</p>
            <p style="color: #555;">You just requested a verification code for your account. This unique code allows you to create an account without using a password.</p>
            <div style="font-size: 32px; font-weight: bold; margin: 20px 0; color: #333; text-align: center;">${otp}</div>
            <p style="color: #555;">Please note this code can only be used once and expires after 10 minutes. Do not share this code with anyone else.</p>
            <p style="color: #555;">If you didn’t request a verification code, you can ignore this email.</p>
            <p style="color: #555;">By signing in or creating an account, you agree with our <a href="#" style="color: #007bff; text-decoration: none;">Terms and conditions</a> and <a href="#" style="color: #007bff; text-decoration: none;">Privacy statement</a>.</p>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #aaa;">
                <p>Copyright © 1996–2025 Booking.com. All rights reserved.</p>
                <p>This email was sent by Booking.com, Oosterdokskade 163, 1011 DL Amsterdam, Netherlands.</p>
                <p><a href="#" style="color: #007bff; text-decoration: none;">Privacy and Cookies</a> | <a href="#" style="color: #007bff; text-decoration: none;">Customer service</a></p>
            </div>
        </div>
    `;
    return { htmlContent }; 
}
async function verifyOTP(userId, enteredOTP) {
  const redisKey = `otp:${userId}`;
  const storedOTP = await redis.get(redisKey);
  console.log('Stored OTP:', storedOTP);
  console.log('Entered OTP:', enteredOTP);
  console.log("email", userId);

  if (!storedOTP) {
    return { success: false, message: 'OTP does not exist or has expired' };
  }

  if (storedOTP === enteredOTP) {
    await redis.del(redisKey);
    return { success: true, message: 'Authentication successful' };
  } else {
    return { success: false, message: 'OTP is incorrect' };
  }
}
module.exports = { 
    sendMail,
    createHtmlOTP,
    verifyOTP
};


// Test thử
// (async () => {
//   const userId = 'user123';
//   const otp = await generateOTP(userId);
//   console.log(`Generated OTP: ${otp}`);

//   const result = await verifyOTP(userId, otp); // test đúng
//   console.log(result);
// })();