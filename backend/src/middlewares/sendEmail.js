const nodemailer = require('nodemailer')
require('dotenv').config()

const emailSend = async (email) => {

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
    });
    
      let info = await transporter.sendMail({
        from:  '"Somebody 👻" <somebody@example.com>',
        to: `${email}`,
        subject: "Hello ✔",
        html: `<p>Hi ${email} your register is successfully!</p>`,
      });
    
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}

module.exports = { emailSend }