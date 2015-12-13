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
  
  matrixGrid.forEach(function(element, index, array) {
    matrixGrid[index].graphics
    .beginFill("DeepSkyBlue")
    .drawRect(0, 0, matrixGridWidth, matrixGridHeight);
    matrixGrid[index].x = (index % 5)*60;
    matrixGrid[index].y = (Math.floor(index / 5))*60;
    matrixGrid[index].selected = false;
    stage.addChild(matrixGrid[index]);
  });
  stage.update();
}
function matrixStart() {
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
        } else if(matrixGrid[index].selected) {
          matrixGrid[index].graphics.beginFill("DeepSkyBlue");
          matrixGrid[index].selected = false;
        }
        matrixGrid[index].graphics.drawRect(0, 0, matrixGridWidth, matrixGridHeight);
        stage.update();
      });
    });    

    actionButton.innerHTML = "Submit";
    actionButton.onclick = function () {matrixSubmit();};
  }, 3000);
}
function matrixSubmit() {
  var numerator = 0;
  var denominator = 5;
  matrixGrid.forEach(function (element, index, array) {
    if(matrixGrid[index].selected) {
      numerator++;
    }
  });
  if(numerator >= 5) {
    alert("You can't select more than 5 boxes!");
  } else {
    uniques.forEach(function (element, index, array) {
      if(matrixGrid[uniques[index]].selected) {
        numerator++;
      }      
    });
    alert(numerator + " out of " + denominator);
  }
}


