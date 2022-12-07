const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

// Running Node App
app.listen(8080, console.log("Server started, Running on 8080..."));

// JWT
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "12q3w4se5rdtyguhij=];lo0-[p;lkjuikmnbvftyuhbvcxdse4r5ew23456yhjui87ythvgtyujkoiuyhg";

// Connecting to MongoDB
const mongoURL =
  "mongodb+srv://arshal:soren@cluster0.ssgyiyi.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(console.log("Connected to Database"))
  .catch((e) => {
    console.log({ error: e });
  });

// Register - Creating User
require("./schema");
const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
