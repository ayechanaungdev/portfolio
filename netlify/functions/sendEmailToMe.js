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
      user: "ayechanaungdev@gmail.com",
      pass: "xasapncyunzjtlzt" 
    }
  });

  const mailOptions = {
    from: 'ayechanaungdev@gmail.com', // system's registered mail
    to: "ayechanaungdev@gmail.com", // recipent mail
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`,
    replyTo: email // client's filled email
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
