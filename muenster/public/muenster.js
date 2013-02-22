var stage, text, container;

function init() {
  var canvas = document.getElementById("canvas");
  canvas.style.background = "#cccccc";

  stage = new createjs.Stage("canvas");
  createjs.Touch.enable(stage);

  createjs.Ticker.setFPS(60);

  container = new createjs.Container();

  text = new createjs.Text("FPS: --", "20px Arial", "#000");
  text.x = 0;
  text.y = 0;
  stage.addChild(text);
  stage.addEventListener("stagemousemove", createSlider);

  createjs.Ticker.addEventListener("tick", updateFPS);

  var left = new createjs.Shape();
  left.graphics.beginFill("#000").drawCircle(300, 500, 50);
  container.addChild(left);

  left.addEventListener("click", addTop);

  var right = new createjs.Shape();
  right.graphics.beginFill("#000").drawCircle(700, 500, 50);
  container.addChild(right);

  right.addEventListener("click", addTop);

  stage.addChild(container);
  stage.update();
}

function updateFPS() {
  text.text = "FPS: " + Math.round(createjs.Ticker.getMeasuredFPS());
}

var topCircle;
var curve, curve2;
var radius = 0;
var x1 = 300;
var y1 = 500;
var x2 = 700;
var y2 = 500;

function addTop() {
  topCircle = new createjs.Shape();
  topCircle.addEventListener("mousedown", getStartPosition);
  container.addChild(topCircle);

  curve = new createjs.Shape();
  container.addChild(curve);

  curve2 = new createjs.Shape();
  container.addChild(curve2);

  createjs.Ticker.addEventListener("tick", updateCircle);
}

var startPosition = {};

function getStartPosition(e) {
  startPosition = {x: e.stageX, y: e.stageY};
  e.addEventListener("mousemove", moveTree);
}

function moveTree(e) {
  var x = e.stageX;
  var y = e.stageY;

  container.x = x - startPosition.x;
  container.y = y - startPosition.y;

}

var slider, slider2, slider3, sliderWidth = 0, sliderWidth2 = 0, sliderWidth3 = 0;
function createSlider() {
  slider = new createjs.Shape();
  container.addChild(slider);

  slider2 = new createjs.Shape();
  container.addChild(slider2);

  slider3 = new createjs.Shape();
  container.addChild(slider3);

  createjs.Ticker.addEventListener("tick", showSlider);
}

function showSlider() {
  if (sliderWidth < 200) {
    slider.graphics.clear().beginFill("#ff0000").rect(0, 50, sliderWidth, 50);
    sliderWidth++;
  }

  if (sliderWidth2 < 500) {
    slider2.graphics.clear().beginFill("#00ff00").rect(0, 150, sliderWidth2, 50);
    sliderWidth2 += 1;
  }

  if (sliderWidth3 < 800) {
    slider3.graphics.clear().beginFill("#0000ff").rect(0, 200, sliderWidth3, 50);
    sliderWidth3 += 1;
  }

  stage.update();
}

function updateCircle() {
  if (radius < 50) {
    topCircle.graphics.clear().beginFill("#000").drawCircle(500, 200, radius);

    radius += 1;
  }

  if (x1 < 500 || y1 > 200) {
    curve.graphics.clear().moveTo(300, 500).beginStroke("#000").setStrokeStyle(20).bezierCurveTo(100, 450, 500, 310, x1, y1);
    if (x1 < 500) {
      x1 += 8;
    }

    if (y1 > 200) {
      y1 -= 8;
    }
  }

  if (x2 > 500 || y2 > 200) {
    curve2.graphics.clear().moveTo(700, 500).beginStroke("#000").setStrokeStyle(20).bezierCurveTo(900, 450, 500, 310, x2, y2);
    if (x2 > 500) {
      x2 -= 8;
    }

    if (y2 > 200) {
      y2 -= 8;
    }
  }

  stage.update();
}

init();
