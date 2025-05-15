import { sendMail , createHtmlOTP ,verifyOTP } from '../services/SendmailServices';

let handleSendEmail = async (req, res) => {
  const { to } = req.body;
  const subject = 'WebBooking Verify email and create an account';
  const { htmlContent } = await createHtmlOTP(to);
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
    const { email,otp } = req.body;
    if (!otp) {
        return res.status(400).json({
        errCode: 2,
        message: 'Missing OTP parameter'
        });
    }
    const result = await verifyOTP(email,otp);
    if ( result.success) {
        return res.status(200).json({
        errCode: 0,
        message: result.message
        });
    } else {
        return res.status(400).json({
        errCode: 1,
        message: result.message
        });
    }
};
module.exports = { 
    handleSendEmail,
    handleVerifyOTP
};