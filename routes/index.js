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

router.get('/', (_req,res)=> {
    res.send('home');
});

router.get('/a', (req,res)=> res.render('boilerplate'));

router.post('/create-user', (req,res) => {
    let [ name, email, password ] = [ req.body.name, req.body.email, req.body.password ];
    
    user.create( name, email, password )
        .then(result => res.status(result.code).send(result))
        .catch(err => res.status(err.errors.code).send(err));
});

// Export router
module.exports = router;