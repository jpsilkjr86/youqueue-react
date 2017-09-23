// imports mongoose
const mongoose = require("mongoose");
// creates Schema class
const Schema = mongoose.Schema;

// creates Party schema
const PartySchema = new Schema({
  party_name: { type: String, required: true },
  party_size: { type: Number, required: true },
  phone_number: { type: String, required: true },
  reserved_under: { type: String, required: true },
  email: { type: String, required: false },
  occasion: { type: Array, required: false },
  is_active: { type: Boolean, default: true },
  arrived_table: { type: Boolean, default: false },
  alerted_sms: { type: Boolean, default: false }
  // // references Restaurant model
  // restaurant_id: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  // // refers to a returning Customer
  // customer_id: { type: Schema.Types.ObjectId, ref: "Customer" }
});

// Create the Party model with the PartySchema
const Party = mongoose.model("Party", PartySchema);

// Export the model
module.exports = Party;