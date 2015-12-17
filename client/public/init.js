var question;
var questionTypes = [
	{type: "matrix", distraction_id: 0},
	{type: "letter", distraction_id: 1},
	{type: "concentration", distraction_id: 0},
	{type: "matrix", distraction_id: 1},
	{type: "letter", distraction_id: 0},
	{type: "concentration", distraction_id: 1},
	{type: "matrix", distraction_id: 0},
	{type: "letter", distraction_id: 1},
	{type: "concentration", distraction_id: 0},
	{type: "matrix", distraction_id: 1},
	{type: "letter", distraction_id: 0},
	{type: "concentration", distraction_id: 1},
	{type: "matrix", distraction_id: 0},
	{type: "letter", distraction_id: 1},
	{type: "concentration", distraction_id: 0},
];

$(function () {
	//remove
	//localStorage.setItem("question", "0");
	if(!localStorage.getItem("question")) {
		localStorage.setItem("question", "0");
	}
	question = localStorage.getItem("question");
	console.log('Question: ' + question);
	
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