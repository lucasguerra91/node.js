var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


/* Challenge yourself 1  */
router.get('/cool', function(req, res, next) {
    res.send('You are so cool');
});
// aca le decimos como manejar la ruta /users/cool

module.exports = router;