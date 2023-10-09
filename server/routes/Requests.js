const express = require('express');
const router = express.Router();
const { Requests, Responses } = require('../models');

/* GET ENDPOINTS */

// view all requests [CS Team Lead]
router.get('/', async (req, res) => {
    // get all requests in the database
    const requests = await Requests.findAll();

    // get all feedback on academic requests of all facilitators***
    const responses = await Responses.findAll();

    // return the result 
    res.status(200).json({requests: requests, responses: responses});
});

// view all academic requests [Facilitator] 
router.get('/staff/:assignedid', async (req, res) => {
    id = req.params['assignedid'];

    // get all requests sent to facilitator
    const requests = await Requests.findAll(
        { 
            where: {assigned_id: id}
        }
    );

    // return the result 
    res.status(200).json(requests);
});


// view all requests made by student [Student] 
router.get('/student/:creatorid', async (req, res) => {
    id = req.params['creatorid'];

    // get all requests made by student
    const requests = await Requests.findAll(
        { 
            where: {creator_id: id}
        }
    );

    // View academic and admin feedback related to them

    // return the result 
    res.status(200).json(requests);
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
router.post('/:requestid', async (req, res) => {
    // get request content
    const request = req.body;
    const requestId = req.params.requestid;

    const data = {
        creator_id: 'kingcs',
        content: request.content,
        request_id: requestId,
    }

    await Responses.create(data);

    res.status(200).json(data);
});


module.exports = router;