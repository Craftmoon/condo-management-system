const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const TenantSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
  },
  dateOfBirth: {
    type: String,
    required: [true, "can't be blank"],
  },
  phone: {
    type: String,
    required: [true, "can't be blank"],
  },
  cpf: {
    type: String,
    required: [true, "can't be blank"],
    unique: true,
  },
  apartmentNumber: {
    type: String,
  },
  representative: {
    type: Boolean,
    required: [true, "can't be blank"],
  },
});

module.exports = mongoose.model("Tenant", TenantSchema);
