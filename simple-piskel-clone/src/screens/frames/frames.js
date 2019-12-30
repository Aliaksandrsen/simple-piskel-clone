import deleteSrc from './images/delete.svg';
import copySrc from './images/copy.svg';


const mainCanvas = document.querySelector('#c1');
const framesWrapper = document.querySelector('.frames-wrapper');

const COLOR_WHITE = '#ffffff';
// ================================================================ заливка 1 фрейма
const frame1Canvas = document.querySelector('#frame1');
const ctxFrame1Canvas = frame1Canvas.getContext('2d');
ctxFrame1Canvas.fillStyle = COLOR_WHITE;
ctxFrame1Canvas.fillRect(0, 0, frame1Canvas.width, frame1Canvas.height);
// ================================================================================


// ================================================ перенос ресунка с основного канваса на фрейм
function copyToCurruntFrame() {
  const currentCanvasFrame = document.querySelector('.current-frame');
  const ctxCurrentCanvasFrame = currentCanvasFrame.getContext('2d');
  ctxCurrentCanvasFrame.imageSmoothingEnabled = false;

  // очистка (т.к. bag c изменением resolution)
  ctxCurrentCanvasFrame
    .clearRect(0, 0, currentCanvasFrame.width, currentCanvasFrame.height);
  // перенос ресунка с основного канваса на фрейм
  ctxCurrentCanvasFrame
    .drawImage(mainCanvas, 0, 0, currentCanvasFrame.width, currentCanvasFrame.width);
}
document.getElementById('c1').addEventListener('click', copyToCurruntFrame);
// ================================================================================


// ================================================================= добавление фрейма
const newFrameBtn = document.querySelector('#addNewFrame');
function addFrame() {
  // const COLOR_WHITE = '#ffffff';
  const ctxMainCanvas = mainCanvas.getContext('2d');
  // ctxMainCanvas.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

  //! залить
  ctxMainCanvas.fillStyle = COLOR_WHITE;
  ctxMainCanvas.fillRect(0, 0, mainCanvas.width, mainCanvas.height);


  const canvasWrapper = document.createElement('div');
  canvasWrapper.className = 'canvasWrapper';

  const canvas = document.createElement('canvas');
  // удаляем класс с текущего
  if (document.querySelector('.current-frame')) {
    document.querySelector('.current-frame').classList.remove('current-frame');
  }
  canvas.className = 'canvas_frame canvas current-frame';

  canvas.width = '128';
  canvas.height = '128';
  // заливаем белым фрейм
  const ctxCanvas = canvas.getContext('2d');
  ctxCanvas.fillStyle = COLOR_WHITE;
  ctxCanvas.fillRect(0, 0, canvas.width, canvas.height);

  canvasWrapper.appendChild(canvas);
  newFrameBtn.before(canvasWrapper);
  canvasWrapper.insertAdjacentHTML('beforeend',
    `<img class="remove" width="30" height="30" src=${deleteSrc}>
     <img class="copy" width="30" height="30" src=${copySrc}>`);
}
newFrameBtn.addEventListener('click', addFrame);
// ================================================================================


// ================================================================ удаление фрейма
function removeFrame() {
  const remove = document.querySelectorAll('.remove');
  // ? при удалении current на предыдущий поставаить

  remove.forEach((item) => {
    if (window.event.target === item) {
      item.parentNode.remove();
    }
  });
}
framesWrapper.addEventListener('click', removeFrame);
// ================================================================================


// ========================================================== выбор текущего фрейма
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

// ========================================================== копирование фрейма
function copyFrame() {
  const copy = document.querySelectorAll('.copy');

  copy.forEach((item) => {
    if (window.event.target === item) {
      const canvasWrapper = document.createElement('div');
      canvasWrapper.className = 'canvasWrapper';

      const copyCanvas = document.createElement('canvas');

      // удаляем класс с текущего
      if (document.querySelector('.current-frame')) {
        document.querySelector('.current-frame').classList.remove('current-frame');
      }
      copyCanvas.className = 'canvas_frame canvas current-frame';

      copyCanvas.width = '128';
      copyCanvas.height = '128';

      canvasWrapper.appendChild(copyCanvas);
      newFrameBtn.before(canvasWrapper);
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
