const express = require('express')
const app = express();
const mongoose = require('mongoose');
const port = 3001;
const Contact = require("./models/Contact.model.js");
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
});

// get all contacts
app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();  //db.contact.find();
        res.status(200).json({
            error: false,
            contacts: contacts
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
});

// delete a contact
app.delete("/contacts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.findByIdAndDelete(id);

        res.status(200).json({
            error: false,
            message: "successfully deleted"
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            error: true,
            message: "internal server error"
        });
    }
});

// create a contact
app.post("/contacts", async (req, res) => {
    try {
        
        console.log(req.body);

        const contact = await Contact.create(req.body);

        res.status(200).json({
            error: false,
            contact: contact,
            message: "successfully created"
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            error: true,
            message: "internal server error"
        });
    }
});


//update
app.put("/contacts/:id", async (req, res) => {
    try {
        
        const id = req.params.id;

        const contact = await Contact.findByIdAndUpdate(id, req.body, {new: true});

        res.status(200).json({
            error: false,
            contact: contact,
            message: "successfully updated"
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            error: true,
            message: "internal server error"
        });
    }
})

mongoose.connect('mongodb://127.0.0.1:27017/contactsDb').then(() => {
    app.listen(port, () => {
        console.log(`contacts app listening on port ${port}`)
    })
}).catch(err => console.log(err.message))

