import {
  ctx,
  canvas,
  activeTool,
} from '../../index';

import {
  currentColorRGBA,
} from '../chooseColor/chooseColor';

const CANVAS_PIXEL_SIZE = 512;
const select = document.getElementById('unitSize');

select.addEventListener('change', () => {
  localStorage.setItem('unitSizes', select.value);
});

// flag for drawWithpencil function (shows that we are in drawing)
let isDrawing = false;
let lastX;
let lastY;


// put pixel color
function setPixel(x, y, c) {
  const unitSizes = localStorage.getItem('unitSizes') || '1';
  const p = ctx.createImageData(unitSizes, unitSizes);

  for (let i = 0; i < p.data.length; i = 4 + i) {
    p.data[0 + i] = c.r;
    p.data[1 + i] = c.g;
    p.data[2 + i] = c.b;
    p.data[3 + i] = c.a;
  }
  ctx.putImageData(p, x, y, 0, 0, unitSizes, unitSizes);
}

// pixel puts its color
function plot(x, y) {
  const COLOR_WHITE = {
    r: 255, g: 255, b: 255, a: 255,
  };
  if (activeTool === 'eraser') {
    setPixel(x, y, COLOR_WHITE);
    return;
  }
  setPixel(x, y, currentColorRGBA);
}

function drawLine(x1, y1, x2, y2, color) {
  let X1 = x1;
  let Y1 = y1;
  const X2 = x2;
  const Y2 = y2;
  if (!isDrawing) return;
  // if (color) {
  plot.color = color;
  // } else {
  // цвет по умолчанию - зеленый
  // plot.color = {
  // r: 0, g: 255, b: 0, a: 255,
  // };
  // }
  const deltaX = Math.abs(X2 - X1);
  const deltaY = Math.abs(Y2 - Y1);
  const signX = X1 < X2 ? 1 : -1;
  const signY = Y1 < Y2 ? 1 : -1;

  let error = deltaX - deltaY;

  plot(X2, Y2);
  while (X1 !== X2 || Y1 !== Y2) {
    plot(X1, Y1);
    const error2 = error * 2;

    if (error2 > -deltaY) {
      error -= deltaY;
      X1 += signX;
    }
    if (error2 < deltaX) {
      error += deltaX;
      Y1 += signY;
    }
  }
}

function drawWithpencilMouseup() {
  if (activeTool === 'pencil' || activeTool === 'eraser') {
    isDrawing = false;
  }
}

function drawWithpencilMouseout() {
  if (activeTool === 'pencil' || activeTool === 'eraser') {
    isDrawing = false;
  }
}

function drawWithpencilMousemove(e) {
  if (activeTool === 'pencil' || activeTool === 'eraser') {
    if (!isDrawing) return;
    drawLine(
      lastX, lastY, Math.floor(e.offsetX / (CANVAS_PIXEL_SIZE / canvas.width)),
      Math.floor(e.offsetY / (CANVAS_PIXEL_SIZE / canvas.height)),
    );
    lastX = Math.floor(e.offsetX / (CANVAS_PIXEL_SIZE / canvas.width));
    lastY = Math.floor(e.offsetY / (CANVAS_PIXEL_SIZE / canvas.height));
  }
}

function drawWithpencilMousedown(e) {
  if (activeTool === 'pencil' || activeTool === 'eraser') {
    isDrawing = true;
    [lastX, lastY] = [
      Math.floor(e.offsetX / (CANVAS_PIXEL_SIZE / canvas.width)),
      Math.floor(e.offsetY / (CANVAS_PIXEL_SIZE / canvas.height)),
    ];
    plot(lastX, lastY);
  }
}

function drawWithpencil() {
  canvas.addEventListener('mousedown', drawWithpencilMousedown);
  canvas.addEventListener('mousemove', drawWithpencilMousemove);
  canvas.addEventListener('mouseup', drawWithpencilMouseup);
  canvas.addEventListener('mouseout', drawWithpencilMouseout);
}

export {
  drawWithpencil,
  drawWithpencilMousedown,
  drawWithpencilMousemove,
  drawWithpencilMouseup,
  drawWithpencilMouseout,
};
