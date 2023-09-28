const nodemailer = require('nodemailer');

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    // Create a transporter using Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mavunila002@gmail.com', // Replace with your Gmail email address
        pass: '0783857780Fr@', // Replace with your Gmail password or an application-specific password
      },
    });

    // Compose the email
    const mailOptions = {
      from: 'sender@gmail.com', // Replace with the sender email address
      to: to,
      subject: subject,
      text: text,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Example usage
const toEmail = 'recipient@example.com';
const emailSubject = 'Hello!';
const emailText = 'This is the body of the email.';
sendEmail(toEmail, emailSubject, emailText);

module.exports = sendEmail