const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/registration")
    .then(() => console.log('connection sucessful'))
    .catch(() => console.log("connections failed"))