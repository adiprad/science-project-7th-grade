var stage;
var matrixGrid;
var matrixGridWidth = 50;
var matrixGridHeight = 50;
var randomFills;
var actionButton;
var uniques;
function matrixInit() {
  actionButton = document.getElementById('action');
  stage = new createjs.Stage("canvas");
  matrixGrid = [
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape()
  ];
}
function matrixStart() {

  matrixGrid.forEach(function (element, index, array) {
    element.graphics
    .beginFill("DeepSkyBlue")
    .drawRect(0, 0, matrixGridWidth, matrixGridHeight);
    element.x = (index % 5)*60;
    element.y = (Math.floor(index / 5))*60;
    element.selected = false;
    stage.addChild(element);
  });

  uniques = chance.unique(chance.integer, 5, {min: 0, max: 24});
  uniques.forEach(function(element, index, array) {
    matrixGrid[uniques[index]].graphics
    .beginFill("LightGreen")
    .drawRect(0, 0, matrixGridWidth, matrixGridHeight);
  });
  stage.update();
  actionButton.innerHTML = "";
  actionButton.onclick = function () {};
  setTimeout(function() {
    uniques.forEach(function (element, index, array) {
      matrixGrid[uniques[index]].graphics
      .beginFill("DeepSkyBlue")
      .drawRect(0, 0, matrixGridWidth, matrixGridHeight);
    });
    stage.update();

    matrixGrid.forEach(function (element, index, array) {
      matrixGrid[index].on("click", function(evt) {
        if(!matrixGrid[index].selected) {
          matrixGrid[index].graphics.beginFill("LightGreen");
          matrixGrid[index].selected = true;
        } else {
          matrixGrid[index].graphics.beginFill("DeepSkyBlue");
          matrixGrid[index].selected = false;
        }
        matrixGrid[index].graphics.drawRect(0, 0, matrixGridWidth, matrixGridHeight);
        stage.update();
      });
    });    

    actionButton.innerHTML = "Submit";
    $("#action").click(function () {
      matrixSubmit();
    });
  }, 4000);
}
function matrixSubmit() {
  console.log('matrixSubmit(): called')
  var numerator = 0;
  var denominator = 5;
  matrixGrid.forEach(function (element, index, array) {
    if(matrixGrid[index].selected) {
      numerator++;
    }
  });

  console.log("Numerator : " + numerator);
  location.reload();
  
}


