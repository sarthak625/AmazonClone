/**
 * Import libraries
 */ 
const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');

const Schema    = mongoose.Schema;

/**
 * Create the user schema
 */
let UserSchema = new Schema({
    email : { type : String, unique: true, lowercase: true },
    password: { type : String },
    profile : { 
        name : { type: String, default : '' },
        picture : { type : String, default : '' }
    },
    address : { type: String },
    history: [{
        date : Date,
        paid : { type : Number, default: 0},
        // item : { type : Schema.Types.ObjectId, ref : '' }
    }]
});


/**
 *  Hash the password before saving into the database
 */ 
UserSchema.pre('save', function(next){
    let user = this;

    if (!user.isModified('password')){
        return next();
    }
    else{
        let salt = bcrypt.genSaltSync(10);
        bcrypt.hash(user.password, salt, (err, hash)=> {
            if (err) next(err);
            else user.password = hash;
            return next();
        });
    }
});

/**
 * Compare the password
 */
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', UserSchema);

module.exports = User;