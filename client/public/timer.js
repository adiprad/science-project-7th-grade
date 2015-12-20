function Timer(timeLimit) {
	this.maxTime = timeLimit;
	currentTime = timeLimit;
	t = null;
	this.start = function (onTick) {
		t = setInterval(function() {
			//console.log("Timer tick: " + currentTime);
			if(currentTime == 0) {
				clearInterval(t);
			}
			onTick(currentTime);
			currentTime--;
		}, 1000);
		//console.log("Timer started: " + currentTime);
	};
	this.stop = function() {
		clearInterval(t);
	};
	this.getCurrentTime = function() {
		return currentTime;
	};
	this.setCurrentTime = function(val) {
		currentTime = val;
	};
}