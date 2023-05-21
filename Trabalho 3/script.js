
let canvas;
let ctx;
let lines = [];
const LINE_WIDTH = 1;
const HALF_LINE_WIDTH = LINE_WIDTH / 2;

let draggingCorner = {
	isDragging: false,
	line : null,
	cornerPosition: '',
	x: 0,
	y: 0
}

const TYPES = {
	START : -1,
	END: 1,
	MIDDLE: 0
}
const fadeDuration = 250;

let lineColor  = 'black';



   
// function isMouseOnSTART(x, y) {
// 	return Math.sqrt((x - STARTX) ** 2 + (y - STARTY) ** 2) < HALF_LINE_WIDTH;
//   }
  
//   function isMouseOnEND(x, y) {
// 	return Math.sqrt((x - ENDX) ** 2 + (y - ENDY) ** 2) < HALF_LINE_WIDTH;
//   }

function drawLine({x1, y1, x2, y2}) {
	console.log(`desenhando uma linha (${x1}, ${y1}) ->(${x2}, ${y2})`)
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineWidth = LINE_WIDTH;
	ctx.strokeStyle = lineColor;
	ctx.stroke();
}

function removeLineFromArray({x1, y1, x2, y2}) {
	lines = lines.filter(line => {
	  return !(line.x1 === x1 && line.y1 === y1 && line.x2 === x2 && line.y2 === y2);
	});
  }


function areCoordinatesClose(a,b, x,y){
	const threshold = 200;
	const dx = Math.abs(a-x);
	const dy = Math.abs(b-y);
	return dx < threshold && dy <threshold;
}

  function getDistanceFromLine({x, y}, line) {
	const { x1, y1, x2, y2 } = line;
	const A = x - x1;
	const B = y - y1;
	const C = x2 - x1;
	const D = y2 - y1;
  
	const dot = A * C + B * D;
	const lenSq = C * C + D * D;
	console.log('lenSeq ', lenSq, 'dot', dot)
	let param = -1;
  
	if (lenSq !== 0) {
	  param = dot / lenSq;
	}
  
	let xx, yy;
  
	if (param < 0) {
		console.log('oi')
	  xx = x1;
	  yy = y1;
	} else if (param > 1) {
		console.log('oi2')
	  xx = x2;
	  yy = y2;
	} else {
		console.log('oi3')
	  xx = x1 + param * C;
	  yy = y1 + param * D;
	}
  
	const dx = x - xx;
	const dy = y - yy;

	return {distance: Math.sqrt(dx * dx + dy * dy), closeTo: param < 0 ? TYPES.END : param > 1 ? TYPES.START : TYPES.MIDDLE};
  }

  function getMousePos(evt) {
	const rect = canvas.getBoundingClientRect();
	const scaleX = canvas.width / rect.width;
	const scaleY = canvas.height / rect.height;
	return {
		x: (evt.clientX - rect.left) * scaleX,
		y: (evt.clientY - rect.top) * scaleY
	};
  }
    
  function isMouseOnLine({x, y}, line) {
	return {
		closeTo: areCoordinatesClose(line.x1, line.y1, x, y) ? TYPES.START : areCoordinatesClose(line.x2, line.y2, x, y) ? TYPES.END : null
	}
  }

  
  function onMouseDown(evt) {
	const mousePos = getMousePos(evt)
	// A primeira linha que encontrar vai pegar ela para mexer primariamente.
	for(const line of lines){
		const { closeTo } = isMouseOnLine(mousePos, line);
		if(closeTo && (isCloseToType(closeTo, TYPES.START) || isCloseToType(closeTo, TYPES.END))){
			if(!draggingCorner.isDragging){
				draggingCorner.isDragging = true;
				draggingCorner.line = line;
				draggingCorner.cornerPosition = closeTo;
			}
		}
	}
  }
  
  function onMouseMove(evt) {
	const mousePos = getMousePos(evt)
	if(draggingCorner.isDragging){
		draggingCorner.x = mousePos.x;
		draggingCorner.y = mousePos.y;
		// cornerMovement();
	}
  }

  function cornerMovement(){
	lineColor = 'blue';
	const newLine = {
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0
	}
	if(isCloseToType(draggingCorner.cornerPosition, TYPES.START)){
		newLine.x1 = draggingCorner.x;
		newLine.y1 = draggingCorner.y;
		newLine.x2 = draggingCorner.line.x2;
		newLine.y2 = draggingCorner.line.y2;
		removeLineFromArray(draggingCorner.line);
		lines.push(newLine)
		refreshCanvas(drawAllPreviousLines)
		drawLine(newLine)
	}
	else if (isCloseToType(draggingCorner.cornerPosition, TYPES.END)){
		newLine.x1 = draggingCorner.line.x1;
		newLine.y1 = draggingCorner.line.y1;
		newLine.x2 = draggingCorner.x;
		newLine.y2 = draggingCorner.y;
		removeLineFromArray(draggingCorner.line);
		lines.push(newLine)
		refreshCanvas(drawAllPreviousLines)
		drawLine(newLine)
	}
	lineColor = 'black';
  }

  function onMouseUp(evt) {
	if(draggingCorner.isDragging){
		draggingCorner.isDragging = false;
		cornerMovement();
		draggingCorner.line = null;
	}
  }

  function isCloseToType(closeTo, type){
	return closeTo === type;
  }


  function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	const refreshButtonC = document.getElementById("refresh-button-clear");
	refreshButtonC.addEventListener("click", () => refreshCanvas(() => console.log('Refreshing screen with nothing')));

	const refreshButton = document.getElementById("refresh-button-one-line");
	refreshButton.addEventListener("click", () => refreshCanvas(addOneLine));

	canvas.addEventListener("mouseup", onMouseUp);
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", onMouseDown);

	lines = []
	refreshCanvas(addOneLine({
		x1: 50,
		y1: 50,
		x2: canvas.width-100,
		y2: canvas.height-50
	}))
  }

  function addOneLine(line){
	lines.push(line)
	drawLine(line);
  }

  function drawAllPreviousLines(){
	for(const line of lines){
		drawLine(line);
	}
  }
  
  function refreshCanvas(lineFunction) {
	fadeOutCanvas();
	setTimeout(() => {
		lineFunction();
		fadeInCanvas();
	}, fadeDuration);
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
  