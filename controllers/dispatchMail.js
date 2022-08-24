var nodemailer = require('nodemailer')

exports.dispatchMail = async (data) => {
  const { receiver, subject, html } = data

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    port: 465,
    host: 'smtp.gmail.com',
  })

  var mailOptions = {
    from: `FitG India <team@fitgindia.com>`,
    to: receiver,
    subject: subject,
    html: html,
  }

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('error occred' + error)
      return { error: 'error occred' + error }
    } else {
      console.log('Email sent: ' + info.response)
      return { message: 'Email sent: ' + info.response, status: '200' }
    }
  })
}
