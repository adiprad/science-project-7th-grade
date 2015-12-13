function Timer(params) {
	this.timeLimit = params.timeLimit;
	this.start = function () {
		var t = setInterval(function() {
			if(this.timeLimit == 0) {
				clearInterval(t);
			}
			console.log(this.timeLimit);
			this.timeLimit--;
		}, 1000);
	}
}