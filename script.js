const canvas = document.getElementById('draw-board');
const colors = document.querySelector('#colors');
const brushWidth = document.querySelector('#brush-size');
const magician = document.querySelector('#magic-btn');


const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#bada55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
ctx.lineHeight = 100;

let isDrawing = false;
let lastX;
let lastY;
let hue = 0;
let direction = true;

const draw = (e) => {
  if(!isDrawing) return;
  console.log(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
};


const drawMagic = (e) => {
  if(!isDrawing) return;
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  
  if(hue >= 360) {
    hue = 0;
  }
  if(ctx.lineWidth >= 600 || ctx.lineWidth <=1 ){
    direction = !direction;
  }

  if(direction){
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

let getCorrectMath = draw;

let magic = false;


canvas.addEventListener('mousemove', drawMagic);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);