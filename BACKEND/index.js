const express = require('express');
const app = express();
require('./Models/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routers/authRouter');

require('dotenv').config();

const PORT = 8080;



app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRouter);

app.get('/ping', (req, res)=>{
    res.send('pong');
  
});



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    

} ) 