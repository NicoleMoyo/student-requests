const express = require('express');
const router = express.Router();
const { Staff, Students } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/* POST ENDPOINTS */

// create a user
router.post('/', async (req, res) => {
    // get request content
    const { first_name, last_name, username, role, password} = req.body;

    // hash the password before submission to database
    bcrypt.hash(password, 10).then((hash) => {
        role === 'Student' ? 
        Students.create({
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: hash,
        }) :
        Staff.create({
            username: username,
            first_name: first_name,
            last_name: last_name, 
            password: hash,
            role: role,
        })
    });

    // result
    res.status(200).json('SUCCESS');
});

// authenticate login a user
router.post('/login', async (req, res) => {
    // get request content
    const { username, password } = req.body;

    // check if username is a Student 
    let user = await Students.findOne({where: { username: username } });

    // check if username is a among Staff 
    if (!user) user = await Staff.findOne({where: { username: username } });

    // if user does not exist
    if (!user){ 
        res.json({error: "User does not exist"});
        return;
    };

    // check if password matches the username's stored password
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            res.json({error: "Wrong Password"});
            return;
        }

        const accessToken = sign({username: user.username, role: user.role}, `${process.env.JWT_KEY}`)

        res.status(200).json({"accessToken": accessToken, "role" : user.role});
    })
});


module.exports = router;