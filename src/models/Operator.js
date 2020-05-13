const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcryptjs");

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

OperatorSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

module.exports = mongoose.model("Operator", OperatorSchema);
