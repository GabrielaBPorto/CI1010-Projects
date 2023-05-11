
let canvas;
let ctx;
let lines = [];
const LINE_WIDTH = 1;
const HALF_LINE_WIDTH = LINE_WIDTH / 2;

let dragging = false;
const fadeDuration = 250;



   
// function isMouseOnStart(x, y) {
// 	return Math.sqrt((x - startX) ** 2 + (y - startY) ** 2) < HALF_LINE_WIDTH;
//   }
  
//   function isMouseOnEnd(x, y) {
// 	return Math.sqrt((x - endX) ** 2 + (y - endY) ** 2) < HALF_LINE_WIDTH;
//   }

function drawLine({x1, y1, x2, y2}) {
	console.log(`desenhando uma linha (${x1}, ${y1}) ->(${x2}, ${y2})`)
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineWidth = LINE_WIDTH;
		ctx.stroke();
  }


  function getDistanceFromLine({x, y}, line) {
	const { x1, y1, x2, y2 } = line;
	const A = x - x1;
	const B = y - y1;
	const C = x2 - x1;
	const D = y2 - y1;
  
	const dot = A * C + B * D;
	const lenSq = C * C + D * D;
	let param = -1;
  
	if (lenSq !== 0) {
	  param = dot / lenSq;
	}
  
	let xx, yy;
  
	if (param < 0) {
	  xx = x1;
	  yy = y1;
	} else if (param > 1) {
	  xx = x2;
	  yy = y2;
	} else {
	  xx = x1 + param * C;
	  yy = y1 + param * D;
	}
  
	const dx = x - xx;
	const dy = y - yy;
	return Math.sqrt(dx * dx + dy * dy);
  }

  function getMousePos(evt) {
	const rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
  }
    
  function isMouseOnLineStart({mouseX, mouseY}, line) {
	const distance = getDistanceFromLine({mouseX, mouseY}, line);
	const threshold = 100;
	return distance <= threshold;
  }
  

  

  function onMouseDown(evt) {
	const mousePos = getMousePos(evt)
	if(!dragging){
		dragging = true
	}
	for(const line of lines){
		console.log('line',line)
		if(isMouseOnLineStart(mousePos, line)){
			console.log('IS CLOSE')
		}
	}
  }
  
  function onMouseMove(evt) {
	
  }
  
  function onMouseUp(evt) {
  }


  function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	// const refreshButtonC = document.getElementById("refresh-button-clear");
	// refreshButtonC.addEventListener("click", () => refreshCanvas(() =>));

	const refreshButton = document.getElementById("refresh-button-one-line");
	refreshButton.addEventListener("click", () => refreshCanvas(addOneLine));

	canvas.addEventListener("mouseup", onMouseUp);
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", onMouseDown);

	refreshCanvas(addOneLine)
  }

  function addOneLine(){
	let line = {
		x1: 50,
		y1: 50,
		x2: canvas.width-100,
		y2: canvas.height-50
	}
	lines.push(line)
	drawLine(line);
  }
  
  function refreshCanvas(lineFunction) {
	fadeOutCanvas();
	setTimeout(() => {
		lineFunction();
		fadeInCanvas();
	}, fadeDuration);
	lines = []
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function fadeOutCanvas() {
	canvas.classList.add("fade-out");
	canvas.classList.remove("fade-in");
  }
  
  function fadeInCanvas() {
	canvas.classList.add("fade-in");
	canvas.classList.remove("fade-out");
  }
  