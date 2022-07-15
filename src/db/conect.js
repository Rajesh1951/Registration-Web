const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://rajesh:WtoNMGmNp7Yvd1Un@cluster0.8oqsh.mongodb.net/registration?retryWrites=true&w=majority")
    .then(() => console.log('connection sucessful'))
    .catch(() => console.log("connections failed"))