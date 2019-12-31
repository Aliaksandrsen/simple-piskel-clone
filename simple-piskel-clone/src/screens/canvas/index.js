import {
  fillBucket,
  fillBucketClick,
} from './tools/fillBucket/fillBucket';
import {
  chooseColor,
  chooseColorInit,
} from './tools/chooseColor/chooseColor';
import {
  drawWithpencil,
  drawWithpencilMousedown,
  drawWithpencilMousemove,
  drawWithpencilMouseup,
  drawWithpencilMouseout,
} from './tools/drawWithpencil/drawWithpencil';
import changeResolution from './tools/resolution/resolution';


const canvas = document.querySelector('#c1');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const STANDART_RESOLUTION = '32';
canvas.width = localStorage.getItem('resolution') || STANDART_RESOLUTION;
canvas.height = localStorage.getItem('resolution') || STANDART_RESOLUTION;


let activeTool = localStorage.getItem('activeTool') || 'pencil';


const clearEventListeners = function clearEventListeners() {
  canvas.removeEventListener('click', fillBucketClick);
  canvas.removeEventListener('click', chooseColorInit);

  canvas.removeEventListener('mousedown', drawWithpencilMousedown);
  canvas.removeEventListener('mousemove', drawWithpencilMousemove);
  canvas.removeEventListener('mouseup', drawWithpencilMouseup);
  canvas.removeEventListener('mouseout', drawWithpencilMouseout);
};


const fillBucketHandler = function changingCurrentSelectedToolToFillBucket() {
  // очистка всех click EventListeners на canvas
  clearEventListeners();
  activeTool = 'fillBucket';
  // подсветка активного tool
  document.querySelector('#fillBucketLabel').classList.add('tools__text_active');
  document.querySelector('#pencilLabel').classList.remove('tools__text_active');
  document.querySelector('#eraserLabel').classList.remove('tools__text_active');
  document.querySelector('#chooseColorlLabel').classList.remove('tools__text_active');
  fillBucket();
};
document.querySelector('#fillBucket').addEventListener('click', fillBucketHandler);


const chooseColorHandler = function changingCurrentSelectedToolToChooseColor() {
  // очистка всех click EventListeners на canvas
  clearEventListeners();
  activeTool = 'chooseColor';
  // подсветка активного tool
  document.querySelector('#fillBucketLabel').classList.remove('tools__text_active');
  document.querySelector('#pencilLabel').classList.remove('tools__text_active');
  document.querySelector('#eraserLabel').classList.remove('tools__text_active');
  document.querySelector('#chooseColorlLabel').classList.add('tools__text_active');
  chooseColor();
};
document.querySelector('#chooseColor').addEventListener('click', chooseColorHandler);


const pencilHandler = function changingCurrentSelectedToolToPencil() {
  // очистка всех click EventListeners на canvas
  clearEventListeners();
  activeTool = 'pencil';
  // подсветка активного tool
  document.querySelector('#fillBucketLabel').classList.remove('tools__text_active');
  document.querySelector('#pencilLabel').classList.add('tools__text_active');
  document.querySelector('#eraserLabel').classList.remove('tools__text_active');
  document.querySelector('#chooseColorlLabel').classList.remove('tools__text_active');
  drawWithpencil();
};
document.querySelector('#pencil').addEventListener('click', pencilHandler);


const eraserHandler = function changingCurrentSelectedToolToPencil() {
  // очистка всех click EventListeners на canvas
  clearEventListeners();
  activeTool = 'eraser';
  // подсветка активного tool
  document.querySelector('#fillBucketLabel').classList.remove('tools__text_active');
  document.querySelector('#pencilLabel').classList.remove('tools__text_active');
  document.querySelector('#eraserLabel').classList.add('tools__text_active');
  document.querySelector('#chooseColorlLabel').classList.remove('tools__text_active');
  drawWithpencil();
};
document.querySelector('#eraser').addEventListener('click', eraserHandler);


// ============================================================== resizing block
document.querySelector('#res32').addEventListener('click', changeResolution);
document.querySelector('#res64').addEventListener('click', changeResolution);
document.querySelector('#res128').addEventListener('click', changeResolution);
// =============================================================================


// ? нужно ли ==================================================================
// use localStorage for buttion Save
function saveBuffer() {
  const data1 = canvas.toDataURL();
  localStorage.setItem('savekey', data1);
}
document.querySelector('#Save').addEventListener('click', saveBuffer);


// use localStorage for buttion Load
function loadBuffer() {
  const data2 = localStorage.getItem('savekey');

  if (data2 === null) { return; }

  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, 512, 512);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = data2;
}
document.querySelector('#Load').addEventListener('click', loadBuffer);
// ? ============================================================================


window.addEventListener('unload', () => {
  localStorage.setItem('activeTool', activeTool);
  // сохранение картинки
  const toDataURLImg = canvas.toDataURL();
  localStorage.setItem('lastImage', toDataURLImg);
});

// инициализация картинки из LocalStorage
window.addEventListener('load', () => {
  const COLOR_WHITE = '#ffffff';
  document.querySelector('#unitSize').value = localStorage.getItem('unitSizes') || '1';

  // заливаем белый фон при старте
  ctx.fillStyle = COLOR_WHITE;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const toDataURLImg1 = localStorage.getItem('lastImage');

  if (toDataURLImg1 === null) { return; }

  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, 512, 512);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0);
  };
  img.src = toDataURLImg1;
});

// get tools
window.addEventListener('load', () => {
  activeTool = localStorage.getItem('activeTool') || 'pencil';
  if (activeTool === 'fillBucket') { fillBucketHandler(); }
  if (activeTool === 'chooseColor') { chooseColorHandler(); }
  if (activeTool === 'pencil') { pencilHandler(); }
  if (activeTool === 'eraser') { eraserHandler(); }
});

export {
  ctx,
  canvas,
  activeTool,
  fillBucketHandler,
  pencilHandler,
  eraserHandler,
  chooseColorHandler,
  saveBuffer,
  loadBuffer,
};
