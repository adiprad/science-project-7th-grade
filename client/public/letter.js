var stage;
var action;
var header;
var unicodes;
var questionData;
function letterInit() {
	//create stage
	stage = new createjs.Stage("canvas");

	//add action button
	action = document.getElementById("action");

	//add header
	header = document.getElementById("header");

	//generate 8 unicode numbers
	unicodes = chance.unique(chance.integer, 8, {min: 65, max: 90});

	//init questionData
	questionData = {
		score_percent: 0,
		distraction_id: localStorage.getItem("distractionAmt"),
		time_taken: 100
	};
}
function letterStart() {
	header.innerHTML = "Memorize the letters!";

	//create text object
	var txt = new createjs.Text("", "50px Lato", "#00BFFF");
	
	//convert unicodes to chars
	unicodes.forEach(function(element, index, array) {
		txt.text += String.fromCharCode(element);
	});
	
	//add text to canvas
	stage.addChild(txt);
	stage.update();

	setTimeout(function() {
		$("#action").toggle();

		txt.text = "";

		//generate random number
		var letter = chance.integer({min: 1, max: 8});
		
		var letterString;
		//convert to cardinal
		if(letter == 1) {
			letterString = letter + "st";
		} else if(letter == 2) {
			letterString = letter + "nd";
		} else if(letter == 3) {
			letterString = letter + "rd";
		} else {
			letterString = letter + "th";
		}

		$("#header").html("What was the "+letterString+" letter in the sequence?");

		$("#answerForm").toggle();

		$("#answerForm").submit(function () {
			var input = $("#answer").val().toUpperCase();

			unicodes.forEach(function (element, index, array) {
				var charData = String.fromCharCode(element);
				if(charData == input) {
					if(index == (letter-1)) {
						questionData.score_percent = 1;
					} else if(Math.abs(letter-index-1) == 1) {
						questionData.score_percent = 0.8;
					} else if(Math.abs(letter-index-1) == 2) {
						questionData.score_percent = 0.6;
					} else {
						questionData.score_percent = 0.4;
					}
				} 
			});
			

			$.ajax({
			  url: "http://localhost:8080/api/v1/user/" + localStorage.getItem("userId") + "/question/" + localStorage.getItem("question"),
			  type: "POST",
			  data: JSON.stringify(questionData),
			  contentType: 'application/json',
			  processData: false,
			  success: function(data, textStatus, jqXHR) {
			    console.log(JSON.stringify(data) + ", " + textStatus);
			    alertify.success("Data successfully submitted!");
			  },
			  error: function(jqXHR, textStatus, errorThrown) {
			    console.log(textStatus + ", " + errorThrown);
			    alertify.error("Oops! There was an error sending the data.");
			  }
			});
			//location.reload();
		});

		stage.update();
	}, 7000);
}