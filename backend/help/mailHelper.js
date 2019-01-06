var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'gmail',
  auth: {
    user: 'tncuong2610@gmail.com',
    pass: 'toolate1992'
  }
});

var mailOptions = {
  from: 'tncuong2610@gmail.com',
  to: '10diemnhathay@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});