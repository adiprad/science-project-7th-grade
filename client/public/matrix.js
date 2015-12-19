var stage;
var matrixGrid;
var matrixGridWidth = 50;
var matrixGridHeight = 50;
var randomFills;
var actionButton;
var uniques;
var selectedBoxes;
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

}
function matrixStart() {
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
  actionButton.innerHTML = "";
  actionButton.disabled = true;
  //actionButton.onclick = function () {};
  setTimeout(function() {
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
  }, 4000);
}
function matrixSubmit() {
  var numerator = 0;
  var denominator = 5;

  uniques.forEach(function (element, uniquesIndex, array) {
    //console.log("unique : " + element + " Selected box : " + selectedBoxes[element]);
    if(selectedBoxes[element] == true) {
      numerator++;
      //console.log("Numerator : " + numerator);
    }
  });
  var questionData = {
     score_percent : numerator/denominator,
     distraction_id : localStorage.getItem("distractionAmt"),
     time_taken : 100
  };
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
  location.reload();
  
}


