const mongoose = require("mongoose");


const restaurantSchema = new mongoose.Schema({
    phone: { type: Number, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },

})

module.exports = mongoose.model.Restaurants || mongoose.model("Restaurant", restaurantSchema);