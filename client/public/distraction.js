window.distraction = {
	videoList: [
		"COvnHv42T-A",
		"FkTybqcX-Yo",
		"BvP4RIqSbiw"
	],
	audioList: [
		"binrpilot",
		"popdance",
		"dubstep",
		"extremeaction"
	]
};
function addDistraction (type) {
	console.log("addDistraction : " + type);
	if (type == "video") {
		var random = chance.integer({min: 0, max: distraction.videoList.length-1});
		$("#distraction").append("<br><br><iframe src='http://youtube.com/embed/"+distraction.videoList[random]+"?autoplay=true&theme=light' style='width: 400px; height: 225px;'></iframe>");
	} else if(type == "audio") {
		var random = chance.integer({min: 0, max: distraction.audioList.length-1});
		console.log("random int : " + random);
		createjs.Sound.play(distraction.audioList[random]);
	} else {
		console.log("Invalid type!");
	}
}
function loadSounds (params) {
	params.forEach(function (element, index, array) {
		console.log("Loading : " + element.path + " ID : " + element.id);
		createjs.Sound.registerSound(element.path, element.id);
	});
}
function playDist (lastDistType) {
	switch(lastDistType) {
		case "video":
			addDistraction("audio");
			localStorage.setItem("lastDistType", "audio");
			break;
		case "audio":
			addDistraction("video");
			localStorage.setItem("lastDistType", "video");
			break;
		default:
			addDistraction("audio");
			localStorage.setItem("lastDistType", "audio");
			break;
	}
}