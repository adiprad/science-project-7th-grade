window.distraction = {
	videoList: [
		//X-Men Apocalypse
		"COvnHv42T-A",
		//Captain America: Civil War
		"FkTybqcX-Yo",
		//Batman V. Superman: Dawn of Justice
		"BvP4RIqSbiw",
		//Star Wars Episode VII: The Force Awakens
		"bytDctZ2g6o",
		//TMNT: Out of the Shadows
		"3CKgLNGfdSM",
		//Kung Fu Panda 3
		"yqN7nHM1YTA",
		//Ice Age 5: Collision Course
		"dyOeUVTSH3U",
		//Independence Day: Resurgence
		"R7a2u8lxWm8"
	],
	audioList: [
		"binrpilot",
		"feliz",
		"jinglebells",
		"wewishyou",
		"dubstep",
		"extremeaction",
		"littleidea",
		"popdance"
	]
};
var sounds = [
	{path: "./05-Binrpilot-Underground.mp3", id: "binrpilot"},
	{path: "./Feliz Navidad.mp3", id: "feliz"},
	{path: "./Jingle-Bells-Singing-Bell.mp3", id: "jinglebells"},
	{path: "./We Wish You.mp3", id: "wewishyou"},
	{path: "./bensound-dubstep.mp3", id: "dubstep"},
	{path: "./bensound-extremeaction.mp3", id: "extremeaction"},
	{path: "./bensound-littleidea.mp3", id: "littleidea"},
	{path: "./bensound-popdance.mp3", id: "popdance"},
];

function getCurrentVideoIndex() {
	var videoIndex = localStorage.getItem("videoIndex");
	if(!videoIndex) {
		localStorage.setItem("videoIndex", "0");
		videoIndex = "0";
		return parseInt(videoIndex);
	}

	var temp = parseInt(videoIndex);
	if (temp == distraction.videoList.length)
		temp = 0;
	return temp;
}

function getCurrentAudioIndex() {
	var audioIndex = localStorage.getItem("audioIndex");
	if(!audioIndex) {
		localStorage.setItem("audioIndex", "0");
		audioIndex = "0";
		return parseInt(audioIndex);
	}

	var temp = parseInt(audioIndex);
	if (temp == distraction.audioList.length)
		temp = 0;
	return temp;
}

function getNextVideoIndex() {
	var videoIndex = localStorage.getItem("videoIndex");
	if(!videoIndex) {
		localStorage.setItem("videoIndex", "0");
		return 0;
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
		return 0;		
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
		
		var audioIndex = getCurrentAudioIndex();
		console.log("Audio Index: " + audioIndex);

		createjs.Sound.play(distraction.audioList[audioIndex]);
	} else {
		console.log("Invalid type!");
	}
}

function loadSound (distAmt, lastDistType, questionInt, callback) {

	switch(distAmt) {
		case 0:
			break;
		case 1:
			if((questionInt % 5) == 0) {
				registerSound(lastDistType, callback);
			}
			break;
		case 2:
			if((questionInt % 2) == 0) {
				registerSound(lastDistType, callback);
			}
			break;
		case 3:
			registerSound(lastDistType, callback);
			break;	
	}
}

function registerSound (lastDistType, callback) {
	if(lastDistType == "audio") {
		return;
	}

	var audioIndex = getNextAudioIndex();

	console.log("Loading : " + sounds[audioIndex].path + " ID : " + sounds[audioIndex].id);
	createjs.Sound.registerSound(sounds[audioIndex].path, sounds[audioIndex].id);			
	createjs.Sound.on("fileload", callback);
}

function playDistByDistAmt(distAmt, lastDistType, questionInt) {
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