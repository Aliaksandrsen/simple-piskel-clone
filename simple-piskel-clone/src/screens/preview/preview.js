import GIF from '../../gifLibrary/gif';
import { COLOR_WHITE, CANVAS_FRAMES_PIXEL_SIZE } from '../../constants';

const UPNG = require('upng-js');
const download = require('downloadjs');

let timerId;
const speedAnimation = document.getElementById('speedAnimation');

// ================================================================ fill preview
const animationCanvas1 = document.getElementById('preview');
const ctxAnimationCanvas = animationCanvas1.getContext('2d');
ctxAnimationCanvas.fillStyle = COLOR_WHITE;
ctxAnimationCanvas.fillRect(0, 0, animationCanvas1.width, animationCanvas1.height);
// ================================================================================

function getAnimation() {
  clearInterval(timerId);
  const allFrames = document.querySelectorAll('.canvas_frame');
  let count = 0;

  timerId = setInterval(() => {
    const animationCanvas = document.querySelector('.canvas_preview');
    const ctx = animationCanvas.getContext('2d');
    ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);

    if (allFrames.length !== 0) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(allFrames[count], 0, 0, animationCanvas.width, animationCanvas.height);

      count += 1;
      if (count === allFrames.length) { count = 0; }
    }
  }, 1000 / speedAnimation.value);
}

const mainCanvas = document.getElementById('c1');
mainCanvas.addEventListener('click', getAnimation);
speedAnimation.addEventListener('change', getAnimation);
// any changes with frames change animation on preview
document.querySelector('.frames-section').addEventListener('mouseup', getAnimation);
// on draw pweview
window.onload = getAnimation;


// ============================================================= FullScreen
function getFullScreen() {
  const animationCanvas = document.getElementById('preview');
  animationCanvas.requestFullscreen();
}
const fullScreen = document.getElementById('fullScreen');
fullScreen.addEventListener('click', getFullScreen);
// ========================================================================


// ============================================================= SaveGif
function getGif() {
  let gifUrl;
  // use library
  const gif = new GIF({
    workers: 2,
    quality: 10,
    background: COLOR_WHITE,
  });
  const allFrames = document.querySelectorAll('.canvas_frame');
  allFrames.forEach((item) => {
    const speed = 1000 / document.getElementById('speedAnimation').value;
    gif.addFrame(item, { delay: `${speed}` });
  });

  gif.on('finished', (blob) => {
    gifUrl = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', `${gifUrl}`);
    downloadLink.setAttribute('download', 'piskel-gif');

    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  });

  gif.render();
}

const saveGif = document.getElementById('saveGif');
saveGif.addEventListener('click', getGif);
// ========================================================================


// ============================================================= SaveApng
function getApng() {
  // apng w & h as frame  w & h
  const apngWidth = CANVAS_FRAMES_PIXEL_SIZE;
  const apngHeight = CANVAS_FRAMES_PIXEL_SIZE;
  const allFrames = document.querySelectorAll('.canvas_frame');
  // need use map
  const allFramesArray = Array.from(allFrames);
  const buffer = allFramesArray.map((item) => {
    const ctxItem = item.getContext('2d');
    return ctxItem.getImageData(0, 0, item.width, item.height).data.buffer;
  });

  const speed = 1000 / document.getElementById('speedAnimation').value;
  const arrayOfDalays = new Array(buffer.length).fill(speed);

  // use library
  const res = UPNG.encode(
    buffer, // array of frames. A frame is an ArrayBuffer containing the pixel data
    apngWidth,
    apngHeight,
    0, // number of colors in the result; 0: all colors (lossless PNG)
    arrayOfDalays,
  );
  download(res, 'amimation.apng', 'apng');
}

const saveApng = document.getElementById('saveApng');
saveApng.addEventListener('click', getApng);
// ======================================================================


export {
  getGif,
  getApng,
  getFullScreen,
  getAnimation,
};
