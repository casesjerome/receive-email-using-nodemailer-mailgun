const express = require("express");
const sendMail = require("./mail");

const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/views"));

//Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/email", (req, res) => {
  console.log(req.body);
  const { email, subject, text } = req.body;
  console.log(email + subject + text);
  
  sendMail(email, subject, text, (err, data) => {
    if (err) {
      log(err);
      res.status(500).json({ message: "Internal Error" });
    } else {
      log("Email Sent");
      res.json({ message: "Email Sent" });
    }
  });
});

//Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => log("Server started on PORT ", PORT));
