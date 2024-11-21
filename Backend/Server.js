const express = require('express');
const cors = require('cors');
const db = require('./Database/dbconnection');

const server = express();

server.use(express.json());
server.use(cors());

const authrouter = require('./Router/auth.router');
server.use('/auth',authrouter);
server.use('/active',authrouter);
server.use('/user',authrouter);








server.listen(3000, () => console.log("server run on port 3000"));