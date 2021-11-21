const { Schema, model } = require("mongoose");

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

module.exports = model("card", cards);
