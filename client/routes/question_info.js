var pg = require('pg');
var connectionString = process.env.DATABASE_URL;


exports.postQuestion = function(req, res) {

    var results = [];
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!req.body) return res.sendStatus(400);
    var user_id = req.params.user_id;
    var question_type = req.params.question_type;

    // Grab data from http request
    // var data = {text: req.body.text};
    var postBody = JSON.stringify(req.body);
    console.log('Request JSON: ' + postBody);
    if (postBody.length == 2) {
        res.set('Content-Type', 'application/json');
        return res.status(400).json({ success: false, data: "Empty request" });
    }

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log('pg.connect() failed : ' + err);
          return res.status(500).json({ success: false, data: err });
        }

        // Check if the user already has the question type
        client.query("SELECT * FROM questioninfo WHERE (user_id = $1 AND question_type = $2);", [user_id, question_type], 
            function(err, result) {
            
            if (err) {
                done();
                console.log('query() failed : ' + err);
                return res.status(500).json({ success: false, data: err });
            }

            console.log('GET result : ' + JSON.stringify(result.rows));
            if (result.rows.length != 0) {
                done();
                err_msg = 'Duplicate question type ' + question_type + ' for user ' + user_id;
                console.log(err_msg);
                return res.status(400).json({ success: false, data: err_msg });
            }

            client.query("INSERT INTO questioninfo(question_type, user_id, score_percent, time_taken, distraction_id) VALUES($1, $2, $3, $4, $5) RETURNING id", [question_type, user_id, req.body.score_percent, req.body.time_taken, req.body.distraction_id], function(err, result) {
                
                if (err) {
                    done();
                    console.log('query() failed : ' + err);
                    return res.status(500).json({ success: false, data: err });
                }

                console.log('GET result : ' + JSON.stringify(result.rows));
                done();
                return res.json(result.rows[0]);
            });

        });

    });
};


exports.getQuestion = function(req, res) {

    var results = [];
    var user_id = req.params.user_id;
    var question_type = req.params.question_type;
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log('GET question '+ question_type +' for user ' + user_id);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log('pg.connect() failed : ' + err);
          return res.status(500).json({ success: false, data: err });
      }

        // SQL Query > Select Data
        client.query("SELECT * FROM questioninfo WHERE (user_id = $1 AND question_type = $2);", [user_id, question_type], function(err, result) {
            done();
            if (err) {
                console.log('query() failed : ' + err);
                return res.status(500).json({ success: false, data: err });
            }

            console.log('GET result : ' + JSON.stringify(result.rows));
            
            if (result.rows.length == 0) {
                console.log("No result");
                return res.json({});
            }
            
            return res.json(result.rows[0]);
        });

    });
};


exports.getAllQuestions = function(req, res) {

    var results = [];
    var user_id = req.params.user_id;
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log('pg.connect() failed : ' + err);
          return res.status(500).json({ success: false, data: err });
      }

        // SQL Query > Select Data
        client.query("SELECT * FROM questioninfo WHERE (user_id = $1);", [user_id], function(err, result) {
            done();
            if (err) {
                console.log('query() failed : ' + err);
                return res.status(500).json({ success: false, data: err });
            }

            console.log('GET result : ' + JSON.stringify(result.rows));
            
            if (result.rows.length == 0) {
                console.log("No result");
                return res.json({});
            }
            
            return res.json(result.rows);
        });

    });

};


