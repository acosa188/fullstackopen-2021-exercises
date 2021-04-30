const mongoose = require("mongoose");

const phoneBookSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
});

phoneBookSchema.set("toJSON", {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
})

module.exports = mongoose.model("PhoneBook", phoneBookSchema);