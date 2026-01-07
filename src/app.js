const express = require('express');
const connectdb= require('./config/database');
const app = express();
const User = require('./models/user'); 

app.use(express.json());

connectdb().then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.post('/signup', (req, res) => {    
    const user = new User(req.body);
    user.save().then((user) => {
        res.status(201).send("User created");
    }).catch((err) => {
        res.status(500).send(err);
    });

});


}).catch((err) => {
    console.log("Database not connected",err);
});



