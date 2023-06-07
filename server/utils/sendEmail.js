const nodemailer = require("nodemailer");



// Send verification email
const sendVerificationEmail = (email, code)  => {
    // Create nodemailer transporter
    console.log(email, code);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 587,
      auth: {
        user: "manish.syndell@gmail.com",
        pass: "cqhiutupdgjwqykv",
      },
    });
    // Create email message
    const message = {
      from: "manish.syndell@gmail.com",
      to: email,
      subject: "Verify your account",
    //   text: `Your Verification code is ${code}`,
    html: `<p>Click the following link to verify your email: <a href="http://localhost:3000/verifyLink?token=${code}">Verify Email</a></p>`
    };
  
    // Send email
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }

  module.exports = sendVerificationEmail;