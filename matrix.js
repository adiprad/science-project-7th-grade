var stage;
var matrixGrid;
var matrixGridWidth = 50;
var matrixGridHeight = 50;
var randomFills;
function matrixInit() {
  stage = new createjs.Stage("canvas");
  matrixGrid = [
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape()
  ];
  
  matrixGrid.forEach(function(element, index, array) {
    matrixGrid[index].graphics
    .beginFill("DeepSkyBlue")
    .drawRect(0, 0, matrixGridWidth, matrixGridHeight);
    matrixGrid[index].x = (index % 5)*60;
    matrixGrid[index].y = (Math.floor(index / 5))*60;
    stage.addChild(matrixGrid[index]);
  });
  stage.update();
}
function matrixStart() {
  var uniques = chance.unique(chance.integer, 5, {min: 0, max: 24});
  uniques.forEach(function(element, index, array) {
    matrixGrid[uniques[index]].graphics
    .beginFill("Blue")
    .drawRect(0, 0, matrixGridWidth, matrixGridHeight);
  });
  stage.update();
}


