import { sendMail , createHtmlOTP ,verifyOTP } from '../services/SendmailServices';

let handleSendEmail = async (req, res) => {
  const { to } = req.body;
  const subject = 'WebBooking Verify email and create an account';
  const { htmlContent } = await createHtmlOTP(req.body.email);
  try {
    const response = await sendMail(to, subject, htmlContent);
    return res.status(200).json({
      errCode: 0,
      message: 'Email sent successfully!',
      response
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      message: 'Failed to send email',
      error: error.message
    });
  }
};

let handleVerifyOTP = async (req, res) => {
    const { otp } = req.body;
    if (!otp) {
        return res.status(400).json({
        errCode: 1,
        message: 'Missing OTP parameter'
        });
    }
    if ( await verifyOTP(otp)) {
        return res.status(200).json({
        errCode: 0,
        message: 'OTP verified successfully!'
        });
    } else {
        return res.status(400).json({
        errCode: 1,
        message: 'Invalid OTP'
        });
    }
};
module.exports = { 
    handleSendEmail,
    handleVerifyOTP
};