var stage;
var concentrationGrid;
var concentrationGridColors;
var concentrationGridWidth = 65;
var concentrationGridHeight = 65;
var header;
var counter = 0;
//var cssColors = ["AliceBlue","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","Yellow","YellowGreen"];
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
              location.reload();
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