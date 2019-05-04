const User = require('../../db/models/user');
const { errors, success } = require('../status-codes'); 

async function create(name, email, password){
    try{
        if( !email ) throw errors.BadRequest('Email is a required field');

        let user = new User({ email, password, profile : { name }});
        await user.save();
        return success.Success(`User created successfully`);
    }
    catch(err){
        if ( err.errors ) throw err;
        else{
            if (err.name === 'MongoError' && err.code === 11000){
                throw errors.Conflict(`The User already exists`);
            }
            else{
                console.log(err);
                throw errors.InternalServerError();
            }
        }
    }
}   

module.exports = {
    create
};