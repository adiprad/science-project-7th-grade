var fs = require('fs');
var http = require('http');


function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}

function CSV2JSON(csv) {
    var array = CSVToArray(csv);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");

    return str;
}

if (process.argv[2] == null) {
	console.log("ERR: No file specified");
	return;
}
var csvData = fs.readFileSync(process.argv[2]);

console.log( CSV2JSON(csvData) );

var userData = JSON.parse(CSV2JSON(csvData));

userData.forEach(function (element, index, array) {
	console.log(postData({
		age: element.Age,
		name: element.Name,
		email: element.Email,
		distAmt: element.DistAmt
	}));
});

function postData (data) {
	//The url we want is `www.nodejitsu.com:1337/`
	var options = {
		host: '173.53.30.106',
		path: '/api/v1/user',
		//since we are listening on a custom port, we need to specify it by hand
		port: '9090',
		//This is what changes the request to a POST request
		method: 'POST',

		headers: {
			'Content-Type' : 'application/json'
		}
	};

	var callback = function(response) {
		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			return str;
		});
	};

	var req = http.request(options, callback);
	//This is the data we are posting, it needs to be a string or a buffer
	req.write(JSON.stringify({
		user_data: {
			age: data.age,
			name: data.name,
			email: data.email.toLowerCase(),
			distraction_amt: data.distAmt
		}
	}));
	req.end();
}