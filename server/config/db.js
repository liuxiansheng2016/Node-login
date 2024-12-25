const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true} )
        .then(() =>console.log("MongoDB connected") )
        .catch(err => console.error('MongoDB connection error:', err))


        