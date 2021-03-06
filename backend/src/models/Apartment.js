const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
  number: {
    type: String,
    required: [true, "can't be blank"],
  },
  block: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
  },
  tenantIds: {
    type: [String],
  },
  representativeTenantId: {
    type: String,
  },
});

module.exports = mongoose.model("Apartment", ApartmentSchema);
