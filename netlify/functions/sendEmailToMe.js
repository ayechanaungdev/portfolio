// netlify/functions/sendEmailToMe.js
const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);

  // Extract data from the request
  const { name, email, subject, message } = data;

  // Configure the email transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ayechanaungdev@gmail.com", // Your Gmail email
      pass: "ilt!aca#gm0148" // Your Gmail password or an application-specific password
    }
  });

  const mailOptions = {
    from: email,
    to: "ayechanaungdev@gmail.com", // Your email address
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully." })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email sending failed." })
    };
  }
};
