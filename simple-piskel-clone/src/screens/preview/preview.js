import GIF from '../../gifLibrary/gif';
import { COLOR_WHITE } from '../../constants';


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
  const gif = new GIF({
    workers: 2,
    quality: 10,
    background: COLOR_WHITE,
    // transparent: 'null',
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


export {
  getGif,
  getFullScreen,
  getAnimation,
};
