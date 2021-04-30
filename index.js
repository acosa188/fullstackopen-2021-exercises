const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log("Connected to the database!");
});


app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :body'));

const PhoneBook = require("./models/phonebook");

app.get("/api/persons", async (req, res) => {
    try {
        const result = await PhoneBook.find({});
        res.json(result);
    } catch (err) {
        console.log("Error when fetching all phonebooks.", err.message);
        res.status(500).end();
    }
})

app.get("/info", async (req, res) => {
    try {
        const persons = await PhoneBook.find({});
        const info = `Phonebook has info for ${persons.length} people <br><br> ${new Date()}`;
        res.send(info);
    } catch (err) {
        console.log("Error when querying information of phonebook.", err.message);
        res.status(500).end();
    }

});

app.get("/api/persons/:id", async (req, res) => {
    try {
        const person = await PhoneBook.findById(req.params.id);

        if (!person) return res.status(404).send("person not found");
        res.json(person);
    } catch (err) {
        console.log(`Error when fetching a phonebook with an id (${req.params.id}).`,)
        res.status(500).end();
    }
})

app.delete("/api/persons/:id", async (req, res, next) => {
    try {
        await PhoneBook.findByIdAndRemove(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
})

app.post("/api/persons", async (req, res) => {
    const body = req.body;

    if (!body.name) return res.status(400).send("Name field is missing");
    if (!body.number) return res.status(400).send("Number field is missing");

    try {
        const userExist = await PhoneBook.find({name: body.name});
        if (userExist.length > 0) return res.status(403).send("Person already exist");


        const person = new PhoneBook({
            name: body.name,
            number: body.number
        });
    
        const result = await person.save();
    
        res.json(result);
    } catch (err) {
        console.log("Error occur when creating a phonebook.", err.message);
        res.status(500).end();
    }
});

const errorHandler = (error, request, response, next) => {
    if(error.name === "CastError") return response.status(400).send({error: "malformatted id"});

    next(error);
}

app.use(errorHandler);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})