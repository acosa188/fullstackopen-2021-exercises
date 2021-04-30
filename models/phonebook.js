const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const phoneBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String,
        required: true
    }
});

phoneBookSchema.set("toJSON", {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
})

phoneBookSchema.plugin(uniqueValidator);

module.exports = mongoose.model("PhoneBook", phoneBookSchema);