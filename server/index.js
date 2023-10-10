const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

// allow parsing of JSON objects
app.use(express.json());

// Routers
const requestRouter = require('./routes/Requests');
const usersRouter = require('./routes/Users');

// allow connection between client and server
app.use(cors()); 

app.use('/requests', requestRouter);
app.use('/auth', usersRouter);



db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});

