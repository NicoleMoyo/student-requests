const express = require('express');
const router = express.Router();
const { Requests, Responses, Staff } = require('../models');
const { Op } = require('sequelize');
const { validateToken } = require('../middleware/Auth');

/* GET ENDPOINTS */

router.get('/', validateToken, async (req, res) => {
    // get all requests in the database
    const requests = await Requests.findAll();

    // get all feedback on academic requests of all facilitators***
    const responses = await Responses.findAll();

    // return the result 
    res.status(200).json({requests: requests, responses: responses});
});

// get all staff
router.get('/staff', async (req, res) => {
    // get all requests in the database
    const facilitators = await Staff.findAll();
    console.log(facilitators);

    // return the result 
    res.status(200).json(facilitators);
});

// view all academic requests [Facilitator] 
router.get('/staff/:assignedid', validateToken, async (req, res) => {
    id = req.params.assignedid;

    // get all requests sent to facilitator
    const requests = await Requests.findAll(
        { 
            where: {assigned_id: id}
        }
    );

    // get all feedback given by facilitator
    const responses = await Responses.findAll({ 
            where: {creator_id: id}
        });

    // return the result 
    res.status(200).json({requests: requests, responses: responses});
});


// view all requests made by student [Student] 
router.get('/student/:creatorid', validateToken, async (req, res) => {
    id = req.params.creatorid;

    // get all requests made by student
    const requests = await Requests.findAll(
        { 
            where: {creator_id: id}
        }
    );

    const requestIds = requests.map(req => req.id);

    console.log(requestIds);

    // get all academic and admin feedback related to them
    const responses = await Responses.findAll({ 
            where: {
                request_id: {
                    [Op.or]: requestIds
                }}
        });

    // return the result 
    res.status(200).json({requests: requests, responses: responses});
});

/* POST ENDPOINTS */

// create a request [Student] ***
router.post('/', async (req, res) => {
    // get request content
    const request = req.body;
    

    // add request to database
    await Requests.create(request);

    // result
    res.status(200).json(request);
});

// create responses on requests [Team Lead & Facilitator]
router.post('/:requestid', validateToken, async (req, res) => {
    // get request content
    const request = req.body;
    const requestId = req.params.requestid;

    const data = {
        creator_id: request.creator_id,
        content: request.content,
        request_id: requestId,
    }

    await Responses.create(data);

    res.status(200).json(data);
});


module.exports = router;