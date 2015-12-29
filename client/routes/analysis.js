var pg = require('pg');
var connectionString = "pg://reportuser:abcd1234@localhost:5432/reportdb";
var data = [];

pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
    	done();
    	console.log('pg.connect() failed : ' + err);
    	return res.status(500).json({ success: false, data: err });
  	}

  	client.query(" select userinfo.id, userinfo.user_data->>'distraction_amt' as distAmt, userinfo.user_data->>'name' as name, AVG(questioninfo.score_percent) as score, AVG(questioninfo.time_taken) as time from userinfo inner join questioninfo on userinfo.id = questioninfo.user_id group by userinfo.id;", function(err, performanceInfo) {
		if (err) {
			done();
		    console.log('query() failed : ' + err);
		    return res.status(500).json({ success: false, data: err });
		}
		console.log(performanceInfo.rows);
  	});
  	done();
});