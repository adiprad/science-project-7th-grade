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
	loadSounds([
		{path: "./05-Binrpilot-Underground.mp3", id: "binrpilot"},
		{path: "./bensound-popdance.mp3", id: "popdance"},
		{path: "./bensound-dubstep.mp3", id: "dubstep"},
		{path: "./bensound-extremeaction.mp3", id: "extremeaction"}
	]);


	//remove
	//localStorage.setItem("question", "0");
	question = localStorage.getItem("question");
	if(!localStorage.getItem("question")) {
		localStorage.setItem("question", "0");
		question = "0";
	}
	
	console.log('Question: ' + question);
	var questionInt = parseInt(question)+1;

	// set the progress bar
	document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
	    this.MaterialProgress.setProgress( Math.ceil(((parseInt(question)/15) * 100)) );
    });
    
	var lastDistType = localStorage.getItem("lastDistType");
	if(!localStorage.getItem("lastDistType")) {
		localStorage.setItem("lastDistType", "");
		lastDistType = "";
	}

	var distAmt = parseInt(localStorage.getItem("distractionAmt"));
	console.log("distractionAmt : " + distAmt);
	console.log("lastDistType : " + lastDistType);
	
	createjs.Sound.on("fileload", function (event) {
		if(event.id == "extremeaction") {
			console.log("File load event : " + JSON.stringify(event));
			switch(distAmt) {
				case 0:
					break;
				case 1:
					if((questionInt % 5) == 0) {
						playDist(lastDistType);
					}
					break;
				case 2:
					if((questionInt % 2) == 0) {
						playDist(lastDistType);
					}
					break;
				case 3:
					playDist(lastDistType);
					break;	
			}
		}
	});
	
	$("#answerForm").toggle();
	$("#app").toggle();
	
	$("#startTest").click(function () {

		$("#app").toggle();
		$("#intro").toggle();

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

		question++;
		localStorage.setItem("question", question + "");

	});
});