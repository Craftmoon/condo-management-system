const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
  block: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
  },
  tenantId: {
    type: String,
    required: [true, "can't be blank"],
  },
});

module.exports = mongoose.model("Apartment", ApartmentSchema);
