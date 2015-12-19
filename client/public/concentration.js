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
}
function concentrationStart() {
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
            console.log(counter);
            if(counter == 8) {
              questionData.score_percent = Math.ceil((8/(turns/1.5)) * 100) / 100;
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
        }, 500);
        
  		});
  	});
}