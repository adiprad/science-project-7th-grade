var stage;
var matrixGrid;
var matrixGridWidth = 50;
var matrixGridHeight = 50;
var randomFills;
var actionButton;
var uniques;
var selectedBoxes;
var timer;
function matrixInit() {
  //console.log("matrixInit called");
  actionButton = document.getElementById('action');
  stage = new createjs.Stage("canvas");
  matrixGrid = [
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),
    new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape(),new createjs.Shape()
  ];
  selectedBoxes = [
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false
  ];
  uniques = chance.unique(chance.integer, 5, {min: 0, max: 24});

  // Timer for the Matrix
  timer = new Timer(30);
  
  $("#instructionsBtn").magnificPopup({
    items: {
        src: '#matrixInst',
        type: 'inline'
    }
  });
}

function matrixStart() {

  $("#instructionsBtn").toggle();
  $("#instBreak").toggle();
  //console.log("matrixStart calle");
  matrixGrid.forEach(function (element, index, array) {
    element.graphics
    .beginFill("DeepSkyBlue")
    .drawRect(0, 0, matrixGridWidth, matrixGridHeight);
    element.x = (index % 5)*60;
    element.y = (Math.floor(index / 5))*60;
    stage.addChild(element);
  });

  uniques.forEach(function(element, index, array) {
    matrixGrid[uniques[index]].graphics
    .beginFill("LightGreen")
    .drawRect(0, 0, matrixGridWidth, matrixGridHeight);
    //console.log("Unique [" + index + "] : " + element);
  });

  stage.update();
  actionButton.disabled = true;
  setTimeout(matrixToSolve, 4000);
}

function matrixToSolve () {
  var numerator = 0;
  var denominator = 5;

  uniques.forEach(function (element, uniquesIndex, array) {
    //console.log("unique : " + element + " Selected box : " + selectedBoxes[element]);
    if(selectedBoxes[element] == true) {
      numerator++;
      //console.log("Numerator : " + numerator);
    }
  });
  timer.start(function (currentTime) {
    $("#timer").html("<img src=\"./Chronometer.png\" height=\"30\" width=\"30\"> &nbsp;" + currentTime + "s");
    if(currentTime == 0) {

      localStorage.setItem("question", parseInt(localStorage.getItem("question")) + 1);


      questionDataPost({
        score_percent : numerator/denominator,
        distraction_id : localStorage.getItem("distractionAmt"),
        time_taken : 100
      });
    }
  });
  uniques.forEach(function (element, index, array) {
    matrixGrid[uniques[index]].graphics
    .beginFill("DeepSkyBlue")
    .drawRect(0, 0, matrixGridWidth, matrixGridHeight);
  });
  stage.update();

  matrixGrid.forEach(function (element, index, array) {
    element.on("click", function(evt) {
      //console.log("Clicked on : " + index );
      if(!selectedBoxes[index]) {
        element.graphics.beginFill("LightGreen");
        selectedBoxes[index] = true;
      } else {
        element.graphics.beginFill("DeepSkyBlue");
        selectedBoxes[index] = false;
      }
      element.graphics.drawRect(0, 0, matrixGridWidth, matrixGridHeight);
      stage.update();
    });
  });    

  actionButton.innerHTML = "Submit";
  actionButton.disabled = false;
  $("#action").click(function () {
    //console.log("uniques : " + uniques);
    //console.log("Selected boxes: " + selectedBoxes);
    matrixSubmit();
  });
}
function matrixSubmit() {
  timer.stop();
  var numerator = 0;
  var denominator = 5;

  uniques.forEach(function (element, uniquesIndex, array) {
    //console.log("unique : " + element + " Selected box : " + selectedBoxes[element]);
    if(selectedBoxes[element] == true) {
      numerator++;
      //console.log("Numerator : " + numerator);
    }
  });

  localStorage.setItem("question", parseInt(localStorage.getItem("question")) + 1);

  questionDataPost({
     score_percent : numerator/denominator,
     distraction_id : localStorage.getItem("distractionAmt"),
     time_taken : Math.ceil(((timer.maxTime - timer.getCurrentTime())/timer.maxTime)*100)
  });
}



