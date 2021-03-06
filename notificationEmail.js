require('dotenv');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const moment = require('moment');

const smtpTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'notifications.productized@gmail.com', 
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendNodemailer = (formData) => {
  const mailOptions = {
    from: 'Productized <notifications.productized@gmail.com>',
    to: `${formData.emailsList}`,
    subject: `${formData.subject}`,
    text: `${formData.content}`,
  };

  const dateArray = formData.date.split(/[-T:]/).map(Number);

  cron.schedule(
    `${dateArray[4]} ${dateArray[3]} ${dateArray[2]} ${dateArray[1]} *`,
    () => {
      smtpTransporter.sendMail(mailOptions, (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Notification email sent!`);
        }
        smtpTransporter.close();
      });
    }
  );
};

module.exports = sendNodemailer;
