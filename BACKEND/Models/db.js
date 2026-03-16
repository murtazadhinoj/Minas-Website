const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url = 'mongodb+srv://allstars01052004_db_user:kirito25@cluster0.d1btncb.mongodb.net/products?appName=Cluster0';

mongoose.connect(mongo_url)
.then(() => {
    console.log('Connected to MongoDB');
    
})
.catch((err) => {
  

    console.error('Error connecting to MongoDB:', err);
});