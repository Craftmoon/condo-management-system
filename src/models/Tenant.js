const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const TenantSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
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
  apartmentNumbers: {
    type: [String],
    required: [true, "can't be blank"],
  },
  apartmentIds: {
    type: [String],
    required: [true, "can't be blank"],
  },
});

TenantSchema.index({ "$**": "text" });

module.exports = mongoose.model("Tenant", TenantSchema);
