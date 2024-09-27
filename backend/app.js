const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const port = 4000;
const connect = require('./db')


const app = express();
connect();

app.use(cors({origin:true}))

app.listen(port,()=>{console.log(`Server started on the port ${port}`)})