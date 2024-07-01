
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: String,
    age: Number,
    email: String,
    phone: String,
    gender: String,
    address: String
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;

