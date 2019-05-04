/**
 * Import libraries
 */
const express   = require('express');
// Initialize router
const router    = express.Router();

/**
 * Import controller logic
 */
const user = require('../controllers/User/user');

router.get('/signup', (req,res) => {
    res.render('accounts/signup',{
        errors : req.flash('errors')
    });
})

router.post('/signup', (req,res) => {
    let [ name, email, password ] = [ req.body.name, req.body.email, req.body.password ];
    
    user.create( name, email, password )
        .then(_result => {
            res.redirect('/');
            // res.status(result.code).send(result);
        })
        .catch(err => {
            if (err.errors.code === 409) {
                req.flash('errors', 'This email id is already in use');
                res.redirect('/signup')
            }
            else {
                req.flash('errors', err.errors.message);
                res.status(err.errors.code).send(err);
            }
        });
});

module.exports = router;