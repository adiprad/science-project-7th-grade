var question;
var questionTypes = [
	{type: "matrix", distraction_id: 0},
	{type: "letter", distraction_id: 0},
	{type: "concentration", distraction_id: 0},
	{type: "matrix", distraction_id: 0},
	{type: "letter", distraction_id: 0},
	{type: "concentration", distraction_id: 0},
	{type: "matrix", distraction_id: 0},
	{type: "letter", distraction_id: 0},
	{type: "concentration", distraction_id: 0},
	{type: "matrix", distraction_id: 0},
	{type: "letter", distraction_id: 0},
	{type: "concentration", distraction_id: 0},
	{type: "matrix", distraction_id: 0},
	{type: "letter", distraction_id: 0},
	{type: "concentration", distraction_id: 0},
];

$(function () {

	//remove
	//localStorage.setItem("question", "0");
	question = localStorage.getItem("question");
	if(!localStorage.getItem("question")) {
		window.open("login.html", "_self");
	}
	
	console.log('Question: ' + question);
	var questionInt = parseInt(question)+1;

	// set the progress bar
	document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
	    this.MaterialProgress.setProgress( Math.ceil(((parseInt(question)/15) * 100)) );
    });
    
	var lastDistType = localStorage.getItem("lastDistType");
	if(!localStorage.getItem("lastDistType")) {
		
	}

	var distAmt = parseInt(localStorage.getItem("distractionAmt"));

	if(!localStorage.getItem("distractionAmt")) {
		window.open("login.html", "_self");
	}
	console.log("distractionAmt : " + distAmt);
	console.log("lastDistType : " + lastDistType);
	
	$("#answerForm").toggle();
	$("#app").toggle();
	$("#instructionsBox").toggle();

	$.ajax({
		url: "/api/v1/user/" + localStorage.getItem("userEmail"),
		type: "GET",
		success: function (data, textStatus, jqXHR) {
			$("#header").append(data.user_data.name);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(textStatus + ", " + errorThrown);
			window.open("login.html", "_self");
		}
	});
	if(questionInt >= 0 && questionInt <= 15) {
		$("#startTest").html("Next task: " + questionInt + " out of 15");
	} else {
		window.open("completed.html", "_self");
	}

	$("#startTest").click(function () {

		$("#app").toggle();
		$("#intro").toggle();


		// Logic to play distraction or not
		console.log('Distraction decision: lastDistType=' + lastDistType + '; distAmt=' + distAmt);
		if (lastDistType == 'audio') {
			// play video distraction
			playDistByDistAmt(distAmt, lastDistType, questionInt);
		} else {
			// Load sound and then, play audio distraction
			loadSound(distAmt, lastDistType, questionInt, function (event) {
				console.log("File load event : " + JSON.stringify(event));
				playDistByDistAmt(distAmt, lastDistType, questionInt);
			});
		}


		if(questionTypes[question].type == "matrix") {
			$("#header").html("Matrix");
			matrixInit();
			$("#action").click(function() {
				matrixStart();

			});
			
			/*$("body").append("<a href='http://youtube.com/watch?v=gcKmyM6YQY8' class='mfp-iframe video-link'>Click for video!</a>");
			$(".video-link").hide();
			$(".video-link").magnificPopup({
				type: "iframe"
			});
			$(".video-link").trigger("click");*/
		} else if(questionTypes[question].type == "letter") {
			$("#header").html("Letter");
			letterInit();
			$("#action").click(function() {
				letterStart();
			});
		} else if(questionTypes[question].type == "concentration") {
			$("#header").html("Concentration");
			concentrationInit();
			$("#action").click(function() {
				concentrationStart();
			});
		}

	});
});