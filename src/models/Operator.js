const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const OperatorSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Operator", OperatorSchema);
