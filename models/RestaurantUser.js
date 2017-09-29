// imports mongoose
const mongoose = require("mongoose");
// creates Schema class
const Schema = mongoose.Schema;

// creates RestaurantUser schema
const RestaurantUserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  restaurant_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  // references parties for the user
  parties: [{ type: Schema.Types.ObjectId, ref: "Party" }],
  default_sms: String
});

// creates the RestaurantUser model with the RestaurantUserSchema
const RestaurantUser = mongoose.model("RestaurantUser", RestaurantUserSchema);

// exports the model
module.exports = RestaurantUser;