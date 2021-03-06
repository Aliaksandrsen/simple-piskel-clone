import Sortable from 'sortablejs';
import deleteSrc from './images/delete.svg';
import copySrc from './images/copy.svg';
import { getAnimation } from '../preview/preview';

import {
  CANVAS_FRAMES_PIXEL_SIZE,
  COLOR_WHITE,
} from '../../constants';


const framesWrapper = document.querySelector('.frames-wrapper');
const mainCanvas = document.getElementById('c1');

// drag-n-drop
Sortable.create(framesWrapper, {
  animation: 350,
  // add callback for preview
  onSort: getAnimation,
});


// ================================================================ fill first frame
const frame1Canvas = document.getElementById('frame1');
const ctxFrame1Canvas = frame1Canvas.getContext('2d');
ctxFrame1Canvas.fillStyle = COLOR_WHITE;
ctxFrame1Canvas.fillRect(0, 0, frame1Canvas.width, frame1Canvas.height);
// ================================================================================


// ================================================ Transferring the canvas to the frame
function copyToCurruntFrame() {
  const currentCanvasFrame = document.querySelector('.current-frame');
  const ctxCurrentCanvasFrame = currentCanvasFrame.getContext('2d');
  ctxCurrentCanvasFrame.imageSmoothingEnabled = false;

  // (because bag with resolution change)
  ctxCurrentCanvasFrame
    .clearRect(0, 0, currentCanvasFrame.width, currentCanvasFrame.height);
  // transferring the canvas to the frame
  ctxCurrentCanvasFrame
    .drawImage(mainCanvas, 0, 0, currentCanvasFrame.width, currentCanvasFrame.width);
}
document.getElementById('c1').addEventListener('click', copyToCurruntFrame);
// ================================================================================


// ================================================================= add frame
const newFrameBtn = document.getElementById('addNewFrame');
function addFrame() {
  const frameResolution = CANVAS_FRAMES_PIXEL_SIZE;
  const ctxMainCanvas = mainCanvas.getContext('2d');

  ctxMainCanvas.fillStyle = COLOR_WHITE;
  ctxMainCanvas.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

  const canvasWrapper = document.createElement('div');
  canvasWrapper.className = 'canvasWrapper drag-box';

  const canvas = document.createElement('canvas');
  // delete class from current
  if (document.querySelector('.current-frame')) {
    document.querySelector('.current-frame').classList.remove('current-frame');
  }
  canvas.className = 'canvas_frame canvas current-frame';

  canvas.width = frameResolution;
  canvas.height = frameResolution;
  // fill the frame with white
  const ctxCanvas = canvas.getContext('2d');
  ctxCanvas.fillStyle = COLOR_WHITE;
  ctxCanvas.fillRect(0, 0, canvas.width, canvas.height);

  canvasWrapper.appendChild(canvas);
  document.querySelector('.frames-wrapper').append(canvasWrapper);
  canvasWrapper.insertAdjacentHTML('beforeend',
    `<img class="remove" width="30" height="30" src=${deleteSrc}>
     <img class="copy" width="30" height="30" src=${copySrc}>`);
}
newFrameBtn.addEventListener('click', addFrame);
// ================================================================================


// ================================================================ delete frame
function removeFrame() {
  const remove = document.querySelectorAll('.remove');

  remove.forEach((item) => {
    if (window.event.target === item) { item.parentNode.remove(); }
  });
}
framesWrapper.addEventListener('click', removeFrame);
// ================================================================================


// ========================================================== current frame selection
framesWrapper.addEventListener('click', () => {
  const framesList = document.querySelectorAll('.canvas_frame');

  framesList.forEach((item) => {
    if (window.event.target === item) {
      framesList.forEach((elem) => {
        elem.classList.remove('current-frame');
      });
    }
  });
});


framesWrapper.addEventListener('click', () => {
  const framesList = document.querySelectorAll('.canvas_frame');

  framesList.forEach((item) => {
    if (window.event.target === item) {
      const ctxMainCanvas = mainCanvas.getContext('2d');

      item.classList.add('current-frame');
      ctxMainCanvas.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      ctxMainCanvas.drawImage(item, 0, 0, mainCanvas.width, mainCanvas.height);
    }
  });
});
// ===============================================================================


// ============================================================ copy frame
function copyFrame() {
  const copy = document.querySelectorAll('.copy');

  copy.forEach((item) => {
    if (window.event.target === item) {
      const canvasWrapper = document.createElement('div');
      canvasWrapper.className = 'canvasWrapper';

      const copyCanvas = document.createElement('canvas');

      // delete class from current
      if (document.querySelector('.current-frame')) {
        document.querySelector('.current-frame').classList.remove('current-frame');
      }
      copyCanvas.className = 'canvas_frame canvas current-frame';

      copyCanvas.width = CANVAS_FRAMES_PIXEL_SIZE;
      copyCanvas.height = CANVAS_FRAMES_PIXEL_SIZE;

      canvasWrapper.appendChild(copyCanvas);
      document.querySelector('.frames-wrapper').append(canvasWrapper);
      canvasWrapper.insertAdjacentHTML('beforeend',
        `<img class="remove" width="30" height="30" src=${deleteSrc}>
        <img class="copy" width="30" height="30" src=${copySrc}>`);


      const ctxCopyCanvas = copyCanvas.getContext('2d');
      ctxCopyCanvas.imageSmoothingEnabled = false;
      ctxCopyCanvas
        .drawImage(item.parentNode.firstElementChild, 0, 0, copyCanvas.width, copyCanvas.height);
    }
  });
}
framesWrapper.addEventListener('click', copyFrame);
// ===============================================================================


export {
  addFrame,
  copyToCurruntFrame,
};
