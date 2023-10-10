const express = require('express');
const router = express.Router();
const { Staff, Students } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// /* GET ENDPOINTS */

/* POST ENDPOINTS */

// create a user
router.post('/', async (req, res) => {
    // get request content
    const { first_name, last_name, username, role, password} = req.body;

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

    if (!user) user = await Staff.findOne({where: { username: username } });

    if (!user){ 
        res.json({error: "User does not exist"});
        return;
    };

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            res.json({error: "Wrong Password"});
            return;
        }

        res.json("You logged in!")
    })
});


module.exports = router;