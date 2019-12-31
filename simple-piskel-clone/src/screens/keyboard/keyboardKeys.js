import {
  fillBucketHandler,
  pencilHandler,
  eraserHandler,
  chooseColorHandler,
  saveBuffer,
  loadBuffer,
} from '../canvas/index';
import { getGif, getFullScreen } from '../preview/preview';
import { addFrame } from '../frames/frames';

const startKeyMap = {
  hotkeyFillBucket: 'b',
  hotkeyPencil: 'p',
  hotkeyEaser: 'e',
  hotkeyChooseColor: 'c',

  hotkeySave: 's',
  hotkeyLoad: 'l',
  hotkeyFullScreen: 'f',
  hotkeyGif: 'g',
};

document.getElementById('hotkeyFillBucket').value = startKeyMap.hotkeyFillBucket;
document.getElementById('hotkeyPencil').value = startKeyMap.hotkeyPencil;
document.getElementById('hotkeyEaser').value = startKeyMap.hotkeyEaser;
document.getElementById('hotkeyChooseColor').value = startKeyMap.hotkeyChooseColor;

document.getElementById('hotkeySave').value = startKeyMap.hotkeySave;
document.getElementById('hotkeyLoad').value = startKeyMap.hotkeyLoad;
document.getElementById('hotkeyFullScreen').value = startKeyMap.hotkeyFullScreen;
document.getElementById('hotkeyGif').value = startKeyMap.hotkeyGif;

// const dict = {
//   hotkeyFillBucket:
// };

const keysActivation = function keysActivation(event) {
  switch (event.key) {
    case document.getElementById('hotkeyFillBucket').value:
      fillBucketHandler();
      break;

    case document.getElementById('hotkeyPencil').value:
      pencilHandler();
      break;

    case document.getElementById('hotkeyEaser').value:
      eraserHandler();
      break;

    case document.getElementById('hotkeyChooseColor').value:
      chooseColorHandler();
      break;

    case 'a':
      addFrame();
      break;

    case document.getElementById('hotkeyFullScreen').value:
      getFullScreen();
      break;

    case document.getElementById('hotkeyGif').value:
      getGif();
      break;

    case document.getElementById('hotkeySave').value:
      saveBuffer();
      break;

    case document.getElementById('hotkeyLoad').value:
      loadBuffer();
      break;

    case '1':
      document.getElementById('res32').click();
      break;

    case '2':
      document.getElementById('res64').click();
      break;

    case '3':
      document.getElementById('res128').click();
      break;

    default:
      break;
  }
};
document.addEventListener('keydown', keysActivation);


const hotKeyMenu = document.getElementById('hotKeyMenu');
function removeHidden() {
  document.removeEventListener('keydown', keysActivation);
  document.getElementById('hotkeysContainer').classList.remove('hidden');
}
hotKeyMenu.addEventListener('click', removeHidden);


const close = document.getElementById('close');
function addHidden() {
  document.getElementById('hotkeysContainer').classList.add('hidden');
  document.addEventListener('keydown', keysActivation);
}
close.addEventListener('click', addHidden);
