var express = require('express');
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser')

var user_info = require('./user_info')
var question_info = require('./question_info')


var connectionString = process.env.DATABASE_URL;

if (connectionString == undefined) {
	console.log("ConnectionStr not provided")
	return 0;
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// POST - Create user
router.post('/api/v1/user', user_info.postUserInfo);

// GET - Gets all the users or Gets one user if the ID is provided in the query string
router.get('/api/v1/user', user_info.getAllUsers);

// GET - Gets the given user
router.get('/api/v1/user/:useremail', user_info.getUser);

// DELETE - Deletes the user
router.delete('/api/v1/user/:useremail', user_info.deleteUser);

// POST - add a question result for a particular user
router.post('/api/v1/user/:user_id/question/:question_type', question_info.postQuestion);

// GET - Gets the question info for a particular user
router.get('/api/v1/user/:user_id/question/:question_type', question_info.getQuestion);

// GET - Gets all the question info for a particular user
router.get('/api/v1/user/:user_id/question', question_info.getAllQuestions);


module.exports = router;





