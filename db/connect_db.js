const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true }, (err, done)=>{
    if (err) console.log('Error occurred. Database connection was unsuccessfull', err);
    else console.log('Database connection successfull');
});