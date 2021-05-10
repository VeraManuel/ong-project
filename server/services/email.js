const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send = async (msg = { to: "", subject: "", text: "", html: "" }) => {
  try {
    await sgMail.send({
      ...msg,
      from: process.env.SENDGRID_FROM,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { send };
