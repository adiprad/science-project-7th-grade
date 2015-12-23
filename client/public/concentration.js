var stage;
var concentrationGrid;
var concentrationGridColors;
var concentrationGridWidth = 65;
var concentrationGridHeight = 65;
var header;
var questionData;
var counter = 0;
var turns = 0;
var cssColors = ["Red", "Green", "Blue", "Tan", "Orange", "Yellow", "Pink", "Purple", "LightSkyBlue", "LightGreen", "Teal", "DarkRed", "Olive", "Silver", "DarkKhaki", "BlanchedAlmond", "BlueViolet", "SlateGray"];
var boxesSelected = [];
var timer;
var actionButton;
function concentrationInit() {
  	header = document.getElementById("header");
  	actionButton = document.getElementById("action");
  	stage = new createjs.Stage("canvas");
  	concentrationGridColors = {
  		colors: chance.unique(chance.integer, 8, {min: 0, max: 17}),
   		pos: chance.unique(chance.integer, 16, {min: 0, max: 15}),
   	};
	  concentrationGrid = [
 		  new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    	new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    	new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    	new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape()
  	];
    //init questionData
    questionData = {
      score_percent: 0,
      distraction_id: localStorage.getItem("distractionAmt"),
      time_taken: 100
    };
    timer = new Timer(60);

    //init instructions
    $("#instructionsBtn").magnificPopup({
      items: {
          src: '#concentrationInst',
          type: 'inline'
      }
    });
}
function concentrationStart() {
    actionButton.disabled = true;

    $("#instructionsBtn").toggle();
    $("#instBreak").toggle();

    timer.start(function (currentTime) {
      $("#timer").html("<img src=\"./Chronometer.png\" height=\"30\" width=\"30\"> &nbsp;" + currentTime + "s");
      if(currentTime == 0) {

        localStorage.setItem("question", parseInt(localStorage.getItem("question")) + 1);

        questionData.score_percent = Math.ceil((8/(turns/1.5)) * 100) / 100;
        questionData.time_taken = 100;
        questionDataPost(questionData);

      }
    });
 	  concentrationGrid.forEach(function (element, index, array) {
    	element.graphics
    		.beginFill("black")
    		.drawRect(0, 0, concentrationGridWidth, concentrationGridHeight);
    	element.x = (index % 4)*75;
    	element.y = (Math.floor(index / 4))*75;
    	stage.addChild(element);
  	});
  	stage.update();
  	
  	concentrationGridColors.colors.forEach(function (element, index, array) {
  		concentrationGrid[concentrationGridColors.pos[index]].color = cssColors[element];
  	});
  	concentrationGridColors.colors.forEach(function (element, index, array) {
  		concentrationGrid[concentrationGridColors.pos[index + 8]].color = cssColors[element];  	
    });

  	concentrationGrid.forEach(function (element, index, array) {
  		element.on("click", function (evt) {
        if(element.finished) 
          return;

        element.graphics
          .beginFill(element.color)
          .drawRect(0, 0, concentrationGridWidth, concentrationGridHeight); 
        stage.update();
        boxesSelected.push(index);
        if(boxesSelected.length != 2) 
          return;

        setTimeout(function () {
          turns++;
          if(concentrationGrid[boxesSelected[0]].color == concentrationGrid[boxesSelected[1]].color) {
            concentrationGrid[boxesSelected[0]].graphics
              .beginFill("DarkGray")
              .drawRect(0, 0, concentrationGridWidth, concentrationGridHeight); 
            concentrationGrid[boxesSelected[1]].graphics
              .beginFill("DarkGray")
              .drawRect(0, 0, concentrationGridWidth, concentrationGridHeight);
            concentrationGrid[boxesSelected[0]].finished = true;
            concentrationGrid[boxesSelected[1]].finished = true;  
            counter++;
            //console.log(counter);
            if(counter == 8) {
              timer.stop();

              localStorage.setItem("question", parseInt(localStorage.getItem("question")) + 1);

              questionData.score_percent = Math.ceil((8/(turns/1.5)) * 100) / 100;
              questionData.time_taken = Math.ceil(((timer.maxTime - timer.getCurrentTime())/timer.maxTime)*100);
              questionDataPost(questionData);
            }
          } else {
            concentrationGrid[boxesSelected[0]].graphics
              .beginFill("Black")
              .drawRect(0, 0, concentrationGridWidth, concentrationGridHeight); 
            concentrationGrid[boxesSelected[1]].graphics
              .beginFill("Black")
              .drawRect(0, 0, concentrationGridWidth, concentrationGridHeight); 
          }
          boxesSelected = [];
          stage.update();
        }, 400);
        
  		});
  	});
}