const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
});

const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: '"Soy el Admin 👻" <admin@kiosko.com>', // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Hello world? Probando Nodemailer", // plain text body
      html, // html body
    });
  } catch (error) {}
};

const getTemplate = (name, token) => {
  return `
  <head>
    <link rel="stylesheet" href="./style.css">
</head>

<div id="email___content">
    <img src="https://i.imgur.com/eboNR82.png" alt="">
    <h2>Hola ${name}</h2>
    <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
    <a
        href="http://localhost:3000/api/user/confirm/${token}"}"
        target="_blank"
    >Confirmar Cuenta</a>
</div>
`;
};

module.exports = {
  sendEmail,
  getTemplate,
};
