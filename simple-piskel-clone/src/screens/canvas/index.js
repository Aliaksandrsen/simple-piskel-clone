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
import {
  changeResolution32,
  changeResolution64,
  changeResolution128,
} from './tools/resolution/resolution';


const canvas = document.getElementById('c1');
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
  document.getElementById('fillBucketLabel').classList.add('tools__text_active');
  document.getElementById('pencilLabel').classList.remove('tools__text_active');
  document.getElementById('eraserLabel').classList.remove('tools__text_active');
  document.getElementById('chooseColorlLabel').classList.remove('tools__text_active');
  fillBucket();
};
document.getElementById('fillBucket').addEventListener('click', fillBucketHandler);


const chooseColorHandler = function changingCurrentSelectedToolToChooseColor() {
  // очистка всех click EventListeners на canvas
  clearEventListeners();
  activeTool = 'chooseColor';
  // подсветка активного tool
  document.getElementById('fillBucketLabel').classList.remove('tools__text_active');
  document.getElementById('pencilLabel').classList.remove('tools__text_active');
  document.getElementById('eraserLabel').classList.remove('tools__text_active');
  document.getElementById('chooseColorlLabel').classList.add('tools__text_active');
  chooseColor();
};
document.getElementById('chooseColor').addEventListener('click', chooseColorHandler);


const pencilHandler = function changingCurrentSelectedToolToPencil() {
  // очистка всех click EventListeners на canvas
  clearEventListeners();
  activeTool = 'pencil';
  // подсветка активного tool
  document.getElementById('fillBucketLabel').classList.remove('tools__text_active');
  document.getElementById('pencilLabel').classList.add('tools__text_active');
  document.getElementById('eraserLabel').classList.remove('tools__text_active');
  document.getElementById('chooseColorlLabel').classList.remove('tools__text_active');
  drawWithpencil();
};
document.getElementById('pencil').addEventListener('click', pencilHandler);


const eraserHandler = function changingCurrentSelectedToolToPencil() {
  // очистка всех click EventListeners на canvas
  clearEventListeners();
  activeTool = 'eraser';
  // подсветка активного tool
  document.getElementById('fillBucketLabel').classList.remove('tools__text_active');
  document.getElementById('pencilLabel').classList.remove('tools__text_active');
  document.getElementById('eraserLabel').classList.add('tools__text_active');
  document.getElementById('chooseColorlLabel').classList.remove('tools__text_active');
  drawWithpencil();
};
document.getElementById('eraser').addEventListener('click', eraserHandler);


const keysActivation = function keysActivation(event) {
  switch (event.code) {
    case 'KeyB':
      fillBucketHandler();
      break;

    case 'KeyP':
      pencilHandler();
      break;

    case 'KeyC':
      chooseColorHandler();
      break;

    default:
      break;
  }
};
document.addEventListener('keydown', keysActivation);


// ============================================================== resizing block
document.getElementById('res32').addEventListener('click', changeResolution32);
document.getElementById('res64').addEventListener('click', changeResolution64);
document.getElementById('res128').addEventListener('click', changeResolution128);
// =============================================================================


// ? нужно ли ==================================================================
// use localStorage for buttion Save
document.getElementById('Save').addEventListener('click', () => {
  const data1 = canvas.toDataURL();
  localStorage.setItem('savekey', data1);
});

// use localStorage for buttion Load
document.getElementById('Load').addEventListener('click', () => {
  const data2 = localStorage.getItem('savekey');

  if (data2 === null) { return; }

  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, 512, 512);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = data2;
});
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
});

export {
  ctx,
  canvas,
  activeTool,
};
