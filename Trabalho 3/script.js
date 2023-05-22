
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


let draggingLine = {
	isDragging: false,
	line : null,
	x3 : 0,
	y3 : 0,
	x: 0,
	y: 0,
	dx : 0,
	dy : 0
}

const TYPES = {
	START : -1,
	END: 1,
	MIDDLE: 0,
	LINE: 2
}
const fadeDuration = 250;

let lineColor  = 'black';


function treatOutofCanvas(x, y){
	if(x < 0){
		x = 0;
	}
	else if ( x > canvas.width){
		x = canvas.width -1;
	}
	if(y < 0){
		y = 0;
	}
	else if ( y > canvas.height){
		y = canvas.height - 1;
	}
	return { x, y };
}

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


function calculateDistanceToLine(mouseX, mouseY, x1, y1, x2, y2) {
	const A = mouseX - x1;
	const B = mouseY - y1;
	const C = x2 - x1;
	const D = y2 - y1;
  
	const dot = A * C + B * D;
	const lenSq = C * C + D * D;
	let param = -1;
  
	if (lenSq !== 0) {
	  param = dot / lenSq;
	}
  
	let closestX, closestY;
  
	if (param < 0) {
	  closestX = x1;
	  closestY = y1;
	} else if (param > 1) {
	  closestX = x2;
	  closestY = y2;
	} else {
	  closestX = x1 + param * C;
	  closestY = y1 + param * D;
	}
  
	const dx = mouseX - closestX;
	const dy = mouseY - closestY;
	const distance = Math.sqrt(dx * dx + dy * dy);
  
	return {
	  closestX: closestX,
	  closestY: closestY,
	  distance: distance
	};
}

function areCoordinatesClose(a,b, x,y){
	const threshold = 50;
	const dx = Math.abs(a-x);
	const dy = Math.abs(b-y);
	return dx < threshold && dy <threshold;
}

function areCoordinatesOnLine(a,b, line){
	const threshold = 50;
	const {closestX, closestY, distance } = calculateDistanceToLine(a,b, line.x1, line.y1, line.x2, line.y2);
	return { closestX, closestY, closeEnough: distance < threshold}
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
	if(areCoordinatesClose(line.x1, line.y1, x, y)){
		return TYPES.START;
	}
	else if( areCoordinatesClose(line.x2, line.y2, x, y)){
		return TYPES.END;
	}
	else if( areCoordinatesClose((line.x1 + line.x2)/2, (line.y1 + line.y2) /2, x,y )){
		return TYPES.MIDDLE;
	}
  }


  
  function onMouseDown(evt) {
	
	console.log('mousedown', evt.button)
	const mousePos = getMousePos(evt)
	for(const line of lines){
		if(evt.button === 0){
			const closeTo = isMouseOnLine(mousePos, line);
			//Realiza a movimentação das pontas
			if(closeTo && (isCloseToType(closeTo, TYPES.START) || isCloseToType(closeTo, TYPES.END))){
				if(!draggingCorner.isDragging){
					console.log('draggingCorner')
					draggingCorner.isDragging = true;
					draggingCorner.line = line;
					draggingCorner.cornerPosition = closeTo;
				}
			}
			//Realiza a movimentação da linha
			else if(closeTo == 0 && (isCloseToType(closeTo, TYPES.MIDDLE))){
				if(!draggingLine.isDragging){
					console.log('draggingLine')
					draggingLine.isDragging = true;
					draggingLine.line = line;
					draggingLine.x3 = (line.x1 + line.x2) / 2;
					draggingLine.y3 = (line.y1 + line.y2) / 2;
				}
			}
		}
		else if ( evt.button === 2){
			const { closestX, closestY, closeEnough} = areCoordinatesOnLine(mousePos.x,mousePos.y, line);
			if(closeEnough){
				breakLine({x:closestX, y:closestY, oldLine: line});
			}
		}
	}
  }

  function breakLine({x,y, oldLine}){
	const newLine1 = {
		x1: oldLine.x1,
		y1: oldLine.y1,
		x2: x,
		y2: y
	}
	const newLine2 = {
		x1: x,
		y1: y,
		x2: oldLine.x2,
		y2: oldLine.y2
	}
	removeLineFromArray(oldLine);
	lines.push(newLine1)
	lines.push(newLine2)
	refreshCanvas(drawAllPreviousLines)
  }
  
  function onMouseMove(evt) {
	const mousePos = getMousePos(evt)
	if(draggingCorner.isDragging){
		draggingCorner.x = mousePos.x;
		draggingCorner.y = mousePos.y;
	}
	else if(draggingLine.isDragging){
		draggingLine.dx = Math.abs(draggingLine.x3 - mousePos.x)
		draggingLine.dy = Math.abs(draggingLine.y3 - mousePos.y)
		draggingLine.x = mousePos.x;
		draggingLine.y = mousePos.y;
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
		draggingCorner.line = newLine;
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
  
  function lineMovement(){
	let x,y;
	const newLine = {
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0
	}
	newLine.x1 = draggingLine.x > draggingLine.x3 ? (draggingLine.line.x1) + draggingLine.dx : (draggingLine.line.x1) - draggingLine.dx;
	newLine.y1 = draggingLine.y > draggingLine.y3 ? (draggingLine.line.y1) + draggingLine.dy : (draggingLine.line.y1) - draggingLine.dy;
	newLine.x2 = draggingLine.x > draggingLine.x3 ? (draggingLine.line.x2) + draggingLine.dx : (draggingLine.line.x2) - draggingLine.dx;
	newLine.y2 = draggingLine.y > draggingLine.y3 ? (draggingLine.line.y2) + draggingLine.dy : (draggingLine.line.y2) - draggingLine.dy;
	removeLineFromArray(draggingLine.line);
	({ x, y } = treatOutofCanvas(newLine.x1, newLine.y1))
	newLine.x1 = x;
	newLine.y1 = y;
	({ x, y } = treatOutofCanvas(newLine.x2, newLine.y2))
	newLine.x2 = x;
	newLine.y2 = y;
	lines.push(newLine)
	refreshCanvas(drawAllPreviousLines)
	drawLine(newLine)
	draggingLine.line = newLine;
  }

  function onMouseUp(evt) {
	if(draggingCorner.isDragging){
		draggingCorner.isDragging = false;
		cornerMovement();
		lineColor = 'black';
		
		draggingCorner.line = null;
	}
	else if (draggingLine.isDragging){
		console.log(' I\'ve  stopped moving the line and the distance is dx ', draggingLine.dx, ' dy ', draggingLine.dy)
		draggingLine.isDragging = false;
		lineMovement();
		draggingLine.line = null;
	}
  }

  function isCloseToType(closeTo, type){
	return closeTo === type;
  }


  function contextMenu(evt){
	evt.preventDefault();
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
	canvas.addEventListener("contextmenu", contextMenu);

	lines = []

	lines.push({
		x1: 50,
		y1: 50,
		x2: canvas.width-100,
		y2: canvas.height-50
	})
	refreshCanvas(addOneLine)
  }

  function addOneLine(){
	drawLine(lines[0]);
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
  