
let canvas;
let ctx;
let line;
let selectedPoint;
let x1, y1;
let computedStyle;
let borderLeft;
let borderTop;
let paddingLeft;
let paddingTop;
let marginLeft;
let marginTop;
let firstline;
const LINE_WIDTH = 5;
const HALF_LINE_WIDTH = LINE_WIDTH / 2;

let startX, startY, endX, endY;
let draggingStart = false;
let draggingEnd = false;
let draggingLine = false;
let mouseOffsetX, mouseOffsetY;


function drawLine(x1, y1, x2, y2) {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineWidth = LINE_WIDTH;
		ctx.stroke();
  }

  function getMousePos(canvas, evt) {
	const rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
  }
  
  function isMouseOnStart(x, y) {
	return Math.sqrt((x - startX) ** 2 + (y - startY) ** 2) < HALF_LINE_WIDTH;
  }
  
  function isMouseOnEnd(x, y) {
	return Math.sqrt((x - endX) ** 2 + (y - endY) ** 2) < HALF_LINE_WIDTH;
  }
  
  function isMouseOnLine(x, y) {
	const a = endY - startY;
	const b = startX - endX;
	const c = endX * startY - startX * endY;
	const d = Math.abs(a * x + b * y + c) / Math.sqrt(a ** 2 + b ** 2);
	return d < HALF_LINE_WIDTH;
  }
  
  function onMouseDown(evt) {
	const mousePos = getMousePos(canvas, evt);
	if (isMouseOnStart(mousePos.x, mousePos.y)) {
	  draggingStart = true;
	} else if (isMouseOnEnd(mousePos.x, mousePos.y)) {
	  draggingEnd = true;
	} else if (isMouseOnLine(mousePos.x, mousePos.y)) {
	  draggingLine = true;
	  mouseOffsetX = mousePos.x - startX;
	  mouseOffsetY = mousePos.y - startY;
	}
  }
  
  function onMouseMove(evt) {
	const mousePos = getMousePos(canvas, evt);
	if (draggingStart) {
	  startX = mousePos.x;
	  startY = mousePos.y;
	  drawLine(startX, startY, endX, endY);
	} else if (draggingEnd) {
	  endX = mousePos.x;
	  endY = mousePos.y;
	  drawLine(startX, startY, endX, endY);
	} else if (draggingLine) {
	  startX = mousePos.x - mouseOffsetX;
	  startY = mousePos.y - mouseOffsetY;
	  endX = startX + (endX - startX);
	  endY = startY + (endY - startY);
	  drawLine(startX, startY, endX, endY);
	}
  }
  
  function onMouseUp(evt) {
	draggingStart = false;
	draggingEnd = false;
	draggingLine = false;
  }


  function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	const refreshButtonC = document.getElementById("refresh-button-clear");
	refreshButtonC.addEventListener("click", refreshCanvas);

	const refreshButton = document.getElementById("refresh-button-one-line");
	refreshButton.addEventListener("click", refreshCanvas);


	canvas.addEventListener("mouseup", onMouseUp);
	canvas.addEventListener("mousemove", onMouseMove)
	

	refreshCanvasOneLine()

  }

  function refreshCanvasOneLine(){
	refreshCanvas();
	firstline = {
		x1: canvas.width/4,
		y1: canvas.height/4,
		x2: canvas.width/2,
		y2: canvas.height/2
	}
	drawLine(firstline);
  }
  
  function refreshCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  }