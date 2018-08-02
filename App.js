const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
console.log(__dirname);

const app = express();
const userList = [];
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "Home.html");
});
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/" + "About.html");
});
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/" + "Contact.html");
});
app.post("/contact", (req, res) => {
  let { firstName, lastName, email, message } = req.body;
  //   userList.push({ firstName, lastName, email, message });
  console.log(userList);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "asghartaraghe5959@gmail.com",
      pass: "farhangkuni"
    }
  });

  const mailOptions = {
    from: "asghartaraghe5959@gmail.com",
    to: "shoura_djafar@yahoo.com",
    subject: "Email with Node.js",
    text: firstName + " " + lastName + " " + email + " " + message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Email sent: " + info.response);
    }
  });
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
