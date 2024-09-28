const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config();
const port = 4000;
const connect = require('./db')
const userRoutes = require('./routes/userRoutes')
const itemRoutes = require('./routes/itemRoutes')


const app = express();
connect();


app.use(cors({origin:true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',userRoutes);
app.use('/api',itemRoutes);

app.listen(port,()=>{console.log(`Server started on the port ${port}`)})