var stage;

function init() {
  var canvas = document.getElementById("canvas");
  canvas.style.background = "#cccccc";

  stage = new createjs.Stage("canvas");
  createjs.Touch.enable(stage);

  var text = new createjs.Text("FPS: " + createjs.Ticker.getFPS(), "20px Arial", "#000");
  text.x = 100;
  text.y = 200;
  stage.addChild(text);

  var left = new createjs.Shape();
  left.graphics.beginFill("#000").drawCircle(300, 700, 50);
  stage.addChild(left);

  left.addEventListener("click", addTop);

  var right = new createjs.Shape();
  right.graphics.beginFill("#000").drawCircle(700, 700, 50);
  stage.addChild(right);

  right.addEventListener("click", addTop);

  stage.update();

  //ctx.lineWidth = 20;

  //ctx.beginPath();
  //ctx.moveTo(300, 700);
  //ctx.quadraticCurveTo(100, 650, 400, 550);
  //ctx.quadraticCurveTo(500, 510, 500, 400);
  //ctx.stroke();

  //ctx.beginPath();
  //ctx.moveTo(700, 700);
  //ctx.quadraticCurveTo(900, 650, 600, 550);
  //ctx.quadraticCurveTo(500, 510, 500, 400);
  //ctx.stroke();
}

var topCircle;
var radius = 0;

function addTop() {
  topCircle = new createjs.Shape();
  stage.addChild(topCircle);

  createjs.Ticker.addEventListener("tick", updateCircle);

}

function updateCircle() {
  if (radius < 50) {
    topCircle.graphics.clear().beginFill("#000").drawCircle(500, 400, radius);

    radius += 2;
  }

  stage.update();
}

init();
