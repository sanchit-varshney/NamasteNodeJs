const express = require('express');
const connectdb= require('./config/database');
const app = express();
const User = require('./models/user');

connectdb().then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.post('/signup', (req, res) => {
    console.log(req.body)
    const userObj = {
        // firstName: req.body.firstName,
        // lastName: req.body.lastName,
        // emailId: req.body.emailId,
        // password: req.body.password
        firstName:"Virat",
        lastName:"Kohli",
        emailId:"virat@gmail.com",
        password:"12345678",
        age:29,
    }
    const user = new User(userObj);
    user.save().then((user) => {
        res.status(201).send(user,"User created");
    }).catch((err) => {
        res.status(500).send(err);
    });

});


}).catch((err) => {
    console.log("Database not connected",err);
});



