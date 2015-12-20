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

function getNextVideoIndex() {
	var videoIndex = localStorage.getItem("videoIndex");
	if(!videoIndex) {
		localStorage.setItem("videoIndex", "0");
		videoIndex = "0";
		return parseInt(videoIndex);
	}

	var temp = parseInt(videoIndex) + 1;
	if (temp == distraction.videoList.length)
		temp = 0;
	localStorage.setItem("videoIndex", temp + "");
	return temp;
}

function getNextAudioIndex() {
	var audioIndex = localStorage.getItem("audioIndex");
	if(!audioIndex) {
		localStorage.setItem("audioIndex", "0");
		audioIndex = "0";
		return parseInt(audioIndex);
	}

	var temp = parseInt(audioIndex) + 1;
	if (temp == distraction.audioList.length)
		temp = 0;
	localStorage.setItem("audioIndex", temp + "");
	return temp;
}

function addDistraction (type) {
	console.log("addDistraction : " + type);
	if (type == "video") {

		var videoIndex = getNextVideoIndex();
		console.log("Video Index: " + videoIndex);

		$("#distraction").append("<br><br><iframe src='http://youtube.com/embed/"+distraction.videoList[videoIndex]+"?autoplay=true&theme=light&controls=0' style='width: 400px; height: 225px; pointer-events: none;'></iframe>");
		$("#distraction").click(function (evt) {
			return false;
		});
	} else if(type == "audio") {
		
		var audioIndex = getNextAudioIndex();
		console.log("Audio Index: " + audioIndex);

		createjs.Sound.play(distraction.audioList[audioIndex]);
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