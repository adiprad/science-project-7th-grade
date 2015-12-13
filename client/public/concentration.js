var stage;
var matrixGrid;
var matrixGridColors;
var matrixGridWidth = 65;
var matrixGridHeight = 65;
var header;
//var cssColors = ["AliceBlue","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","Yellow","YellowGreen"];
var cssColors = ["Red", "Green", "Blue", "Tan", "Orange", "Yellow", "Pink", "Purple", "LightSkyBlue", "LightGreen", "Teal", "DarkRed", "Olive", "Silver", "DarkKhaki", "BlanchedAlmond", "BlueViolet", "SlateGray"];
var boxesSelected = [];
function concentrationInit() {
  	header = document.getElementById("header");
  	actionButton = document.getElementById("action");
  	stage = new createjs.Stage("canvas");
  	matrixGridColors = {
  		colors: chance.unique(chance.integer, 8, {min: 0, max: 17}),
   		pos: chance.unique(chance.integer, 16, {min: 0, max: 15}),
   	};
	  matrixGrid = [
 		  new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    	new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    	new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    	new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape()
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
  		matrixGrid[matrixGridColors.pos[index]].color = cssColors[element];
  	});
  	matrixGridColors.colors.forEach(function (element, index, array) {
  		matrixGrid[matrixGridColors.pos[index + 8]].color = cssColors[element];  	
    });

  	matrixGrid.forEach(function (element, index, array) {
  		element.on("click", function (evt) {
        if(element.finished) 
          return;

        element.graphics
          .beginFill(element.color)
          .drawRect(0, 0, matrixGridWidth, matrixGridHeight); 
        stage.update();
        boxesSelected.push(index);
        if(boxesSelected.length != 2) 
          return;

        setTimeout(function () {
          if(matrixGrid[boxesSelected[0]].color == matrixGrid[boxesSelected[1]].color) {
            matrixGrid[boxesSelected[0]].graphics
              .beginFill("DarkGray")
              .drawRect(0, 0, matrixGridWidth, matrixGridHeight); 
            matrixGrid[boxesSelected[1]].graphics
              .beginFill("DarkGray")
              .drawRect(0, 0, matrixGridWidth, matrixGridHeight);
            matrixGrid[boxesSelected[0]].finished = true;
            matrixGrid[boxesSelected[1]].finished = true;  
          } else {
            matrixGrid[boxesSelected[0]].graphics
              .beginFill("Black")
              .drawRect(0, 0, matrixGridWidth, matrixGridHeight); 
            matrixGrid[boxesSelected[1]].graphics
              .beginFill("Black")
              .drawRect(0, 0, matrixGridWidth, matrixGridHeight); 
          }
          boxesSelected = [];
          stage.update();
        }, 500);
        
  		});
  	});
}