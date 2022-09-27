const express = require("express");
const connection = require("./Config/db");
const RegModel = require("./Model/UserModel");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.post("/signup", async (req, res) => {
  let { name, email, mobile, password } = req.body;

  //   console.log(req.body);

  if (name && email && mobile && password) {
    const user = new RegModel({
      name,
      email,
      mobile,
      password,
    });

    const data = await RegModel.find({ email, mobile });

    // console.log(data, data.length);

    if (data.length == 0) {
      user.save();

      return res
        .status(201)
        .json({ message: "Signup successfull", data: req.body });
    } else {
      return res.status(401).json({ message: "User already exists" });
    }
  } else {
    return res.status(404).json({ message: "Registration failed" });
  }
});

app.get("/users", async (req, res) => {
  const { page = 1, limit = 3 } = req.query;

  const usersList = await RegModel.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.status(200).json({ total: usersList.length, data: usersList });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }

  console.log("Listening to port 8080");
});
