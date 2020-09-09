const mongoose = require("mongoose");

const schema = mongoose.Schema({
  highleyLikelyToBuy: Number,
  eligibleLead: Boolean,
  name: String,
  phone: String,
  city: String,
  state: String,
  zip: String,
  preferredContactMethod: String
})

module.exports = mongoose.model("Leads", schema)