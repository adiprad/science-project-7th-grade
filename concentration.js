var stage;
var matrixGrid;
var matrixGridColors;
var matrixGridWidth = 65;
var matrixGridHeight = 65;
var header;
function concentrationInit() {
  	header = document.getElementById("header");
  	actionButton = document.getElementById("action");
  	stage = new createjs.Stage("canvas");
  	matrixGridColors = {
  		colors: [
 			  chance.unique(chance.integer, 3, {min: 50, max: 255}), chance.unique(chance.integer, 3, {min: 50, max: 255}), chance.unique(chance.integer, 3, {min: 50, max: 255}), chance.unique(chance.integer, 3, {min: 50, max: 255}), 
    		chance.unique(chance.integer, 3, {min: 50, max: 255}), chance.unique(chance.integer, 3, {min: 50, max: 255}), chance.unique(chance.integer, 3, {min: 50, max: 255}), chance.unique(chance.integer, 3, {min: 50, max: 255}), 
   		],
   		pos: chance.unique(chance.integer, 16, {min: 0, max: 15}),
   	};
	  matrixGrid = [
 		  new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    	new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    	new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    	new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
  	];
}
function concentrationStart() {
 	  matrixGrid.forEach(function (element, index, array) {
    	element.graphics
    		.beginFill("black")
    		.drawRect(0, 0, matrixGridWidth, matrixGridHeight);
    	element.x = (index % 4)*75;
    	element.y = (Math.floor(index / 4))*75;
    	stage.addChild(element);
  	});
  	stage.update();
  	
  	matrixGridColors.colors.forEach(function (element, index, array) {
  		matrixGrid[matrixGridColors.pos[index]].color = "rgb("+element[0]+", "+element[1]+", "+element[2]+")";
  	});
  	matrixGridColors.colors.forEach(function (element, index, array) {
  		matrixGrid[matrixGridColors.pos[index + 8]].color = "rgb("+element[0]+", "+element[1]+", "+element[2]+")";
  	});

  	matrixGrid.forEach(function (element, index, array) {
  		element.on("click", function (evt) {
        element.graphics
          .beginFill(element.color)
          .drawRect(0, 0, matrixGridWidth, matrixGridHeight);    
        stage.update(); 		
  		});
  	});
}