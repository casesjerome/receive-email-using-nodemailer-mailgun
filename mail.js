const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: process.env.API_KEY || "MY_API_KEY",
    domain: process.env.DOMAIN || "MY_DOMAIN",
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, callback) => {
  const mailOptions = {
    from: email,
    to: "your@email.com",
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, data);
  });
};

module.exports = sendMail;