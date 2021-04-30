const mongoose = require("mongoose");


if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log("The format of the command should be node mongo.js <dbpassword> <phone name> <phone number> or node mongo.js <dbpassword>.");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://superuser:${password}@testenv000.xuyrb.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log("Connected to the database");
});

const phoneBookSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
});

const PhoneBook = mongoose.model("PhoneBook", phoneBookSchema);

// Get all phonebooks
if(process.argv.length === 3){
    PhoneBook.find({}).then((res)=>{
        console.log("phonebook:")
        res.forEach(phonebook =>{
            console.log(`${phonebook.name} ${phonebook.number}`);
        });
        mongoose.connection.close();
        process.exit(1);
    });
}

// Create a phonebook
if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    const phoneBook = new PhoneBook({
        id: 1,
        name,
        number
    });

    phoneBook.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    })
}


