var stage;
var action;
var header;
var unicodes;
function letterInit() {
	//create stage
	stage = new createjs.Stage("canvas");

	//add action button
	action = document.getElementById("action");

	//add header
	header = document.getElementById("header");

	//generate 7 unicode numbers
	unicodes = chance.unique(chance.integer, 8, {min: 65, max: 90});
}
function letterStart() {
	header.innerHTML = "Memorize the letters!";

	//create text object
	var txt = new createjs.Text("", "50px Lato", "#00BFFF");
	
	//convert unicodes to chars
	unicodes.forEach(function(element, index, array) {
		txt.text += String.fromCharCode(unicodes[index]);
	});
	
	//add text to canvas
	stage.addChild(txt);
	stage.update();

	setTimeout(function() {
		$("#action").toggle();

		txt.text = "";

		//generate random number
		var letter = chance.integer({min: 1, max: 7});
		
		//convert to cardinal
		if(letter == 1) {
			letter += "st";
		} else if(letter == 2) {
			letter += "nd";
		} else if(letter == 3) {
			letter += "rd";
		} else {
			letter += "th";
		}

		$("#header").html("What was the "+letter+" letter in the sequence?");

		$("#answerForm").toggle();

		$("#answerForm").submit(function () {
			location.reload();
		});

		stage.update();
	}, 7000);
}