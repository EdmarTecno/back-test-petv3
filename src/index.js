const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Schema, model } = require("mongoose");

const app = express();

const cards = Schema({
  number: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  cvv: {
    required: true,
    type: String
  },
  month: {
    required: true,
    type: String
  },
  year: {
    required: true,
    type: String
  }
});

const CardData = model("card", cards);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await dbConnection();
    const all = await CardData.find();
    res.json(all);
  } catch (error) {
    res.status(500).json({ err: "a pasado un error", msg: error });
  }
});

app.post("/", async (req, res) => {
  const row = req.body;
  console.log(row);
  try {
    await dbConnection();
    const card = new CardData(row);
    const response = await card.save();
    res.status(201).json({ ...response });
  } catch (error) {
    res.status(500).json({ err: "a pasado un error", msg: error });
  }
});

app.listen(8080);

const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (error) {
    console.log(error);
  }
};
