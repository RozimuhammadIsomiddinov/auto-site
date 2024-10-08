const dotenv = require("dotenv");
const { createTransport } = require("nodemailer");

dotenv.config();

const transporter = createTransport(
  {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  {
    from: `mailer test <${process.env.SMTP_USER}>`,
  }
);

const mailer = async (message) => {
  try {
    const info = await transporter.sendMail(message);
    return info;
  } catch (err) {
    console.error("Error sending email:", err.message);
    return err.message;
  }
};

module.exports = { mailer };
