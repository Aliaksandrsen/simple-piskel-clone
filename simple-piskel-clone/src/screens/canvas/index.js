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
import { copyToCurruntFrame } from '../frames/frames';

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
  // remove all click EventListeners on canvas
  clearEventListeners();
  activeTool = 'fillBucket';
  // selection(backlight) active tool
  document.getElementById('fillBucketLabel').classList.add('tools__text_active');
  document.getElementById('pencilLabel').classList.remove('tools__text_active');
  document.getElementById('eraserLabel').classList.remove('tools__text_active');
  document.getElementById('chooseColorlLabel').classList.remove('tools__text_active');
  fillBucket();
};
document.getElementById('fillBucket').addEventListener('click', fillBucketHandler);


const chooseColorHandler = function changingCurrentSelectedToolToChooseColor() {
  clearEventListeners();
  activeTool = 'chooseColor';

  document.getElementById('fillBucketLabel').classList.remove('tools__text_active');
  document.getElementById('pencilLabel').classList.remove('tools__text_active');
  document.getElementById('eraserLabel').classList.remove('tools__text_active');
  document.getElementById('chooseColorlLabel').classList.add('tools__text_active');
  chooseColor();
};
document.getElementById('chooseColor').addEventListener('click', chooseColorHandler);


const pencilHandler = function changingCurrentSelectedToolToPencil() {
  clearEventListeners();
  activeTool = 'pencil';

  document.getElementById('fillBucketLabel').classList.remove('tools__text_active');
  document.getElementById('pencilLabel').classList.add('tools__text_active');
  document.getElementById('eraserLabel').classList.remove('tools__text_active');
  document.getElementById('chooseColorlLabel').classList.remove('tools__text_active');
  drawWithpencil();
};
document.getElementById('pencil').addEventListener('click', pencilHandler);


const eraserHandler = function changingCurrentSelectedToolToPencil() {
  clearEventListeners();
  activeTool = 'eraser';

  document.getElementById('fillBucketLabel').classList.remove('tools__text_active');
  document.getElementById('pencilLabel').classList.remove('tools__text_active');
  document.getElementById('eraserLabel').classList.add('tools__text_active');
  document.getElementById('chooseColorlLabel').classList.remove('tools__text_active');
  drawWithpencil();
};
document.getElementById('eraser').addEventListener('click', eraserHandler);


// ============================================================== resizing block
document.getElementById('res32').addEventListener('click', changeResolution);
document.getElementById('res64').addEventListener('click', changeResolution);
document.getElementById('res128').addEventListener('click', changeResolution);
// =============================================================================


// ?================================================================== Old functionality
// use localStorage for buttion Save
function saveBuffer() {
  const data1 = canvas.toDataURL();
  localStorage.setItem('savekey', data1);
}
document.getElementById('Save').addEventListener('click', saveBuffer);


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
document.getElementById('Load').addEventListener('click', loadBuffer);
// ? =====================================================================================


window.addEventListener('unload', () => {
  localStorage.setItem('activeTool', activeTool);
  // saving to LS
  const toDataURLImg = canvas.toDataURL();
  localStorage.setItem('lastImage', toDataURLImg);
});

// initialization from LS
window.addEventListener('load', () => {
  const COLOR_WHITE = '#ffffff';
  document.getElementById('unitSize').value = localStorage.getItem('unitSizes') || '1';

  // fill the background at startup
  ctx.fillStyle = COLOR_WHITE;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const toDataURLImg1 = localStorage.getItem('lastImage');

  if (toDataURLImg1 === null) { return; }

  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, 512, 512);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0);
    // drow first frame
    copyToCurruntFrame();
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
