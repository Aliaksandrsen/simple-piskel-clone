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
  hotkeyEraser: 'e',
  hotkeyChooseColor: 'c',
  hotkeyAddFrame: 'a',
  hotkeySave: 's',
  hotkeyLoad: 'l',
  hotkeyFullScreen: 'f',
  hotkeyGif: 'g',
  hotkeyRes1: '1',
  hotkeyRes2: '2',
  hotkeyRes3: '3',
};

const hotkeyFillBucket = document.getElementById('hotkeyFillBucket');
const hotkeyPencil = document.getElementById('hotkeyPencil');
const hotkeyEraser = document.getElementById('hotkeyEraser');
const hotkeyChooseColor = document.getElementById('hotkeyChooseColor');
const hotkeyAddFrame = document.getElementById('hotkeyAddFrame');
const hotkeySave = document.getElementById('hotkeySave');
const hotkeyLoad = document.getElementById('hotkeyLoad');
const hotkeyFullScreen = document.getElementById('hotkeyFullScreen');
const hotkeyGif = document.getElementById('hotkeyGif');
const hotkeyRes1 = document.getElementById('hotkeyRes1');
const hotkeyRes2 = document.getElementById('hotkeyRes2');
const hotkeyRes3 = document.getElementById('hotkeyRes3');

hotkeyFillBucket.value = startKeyMap.hotkeyFillBucket;
hotkeyPencil.value = startKeyMap.hotkeyPencil;
hotkeyEraser.value = startKeyMap.hotkeyEraser;
hotkeyChooseColor.value = startKeyMap.hotkeyChooseColor;
hotkeyAddFrame.value = startKeyMap.hotkeyAddFrame;
hotkeySave.value = startKeyMap.hotkeySave;
hotkeyLoad.value = startKeyMap.hotkeyLoad;
hotkeyFullScreen.value = startKeyMap.hotkeyFullScreen;
hotkeyGif.value = startKeyMap.hotkeyGif;
hotkeyRes1.value = startKeyMap.hotkeyRes1;
hotkeyRes2.value = startKeyMap.hotkeyRes2;
hotkeyRes3.value = startKeyMap.hotkeyRes3;


const keysActivation = function keysActivation(event) {
  switch (event.key) {
    case hotkeyFillBucket.value:
      fillBucketHandler();
      break;

    case hotkeyPencil.value:
      pencilHandler();
      break;

    case hotkeyEraser.value:
      eraserHandler();
      break;

    case hotkeyChooseColor.value:
      chooseColorHandler();
      break;

    case hotkeyAddFrame.value:
      addFrame();
      break;

    case hotkeyFullScreen.value:
      getFullScreen();
      break;

    case hotkeyGif.value:
      getGif();
      break;

    case hotkeySave.value:
      saveBuffer();
      break;

    case hotkeyLoad.value:
      loadBuffer();
      break;

    case hotkeyRes1.value:
      document.getElementById('res32').click();
      break;

    case hotkeyRes2.value:
      document.getElementById('res64').click();
      break;

    case hotkeyRes3.value:
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


// ================================================================ set titles for hints
function hintsInit() {
  document.getElementById('fillBucket').setAttribute('title', `${hotkeyFillBucket.value}`);
  document.getElementById('pencil').setAttribute('title', `${hotkeyPencil.value}`);
  document.getElementById('eraser').setAttribute('title', `${hotkeyEraser.value}`);
  document.getElementById('chooseColor').setAttribute('title', `${hotkeyChooseColor.value}`);
  document.getElementById('Save').setAttribute('title', `${hotkeySave.value}`);
  document.getElementById('Load').setAttribute('title', `${hotkeyLoad.value}`);
  document.getElementById('addNewFrame').setAttribute('title', `${hotkeyAddFrame.value}`);
  document.getElementById('res32').setAttribute('title', `${hotkeyRes1.value}`);
  document.getElementById('res64').setAttribute('title', `${hotkeyRes2.value}`);
  document.getElementById('res128').setAttribute('title', `${hotkeyRes3.value}`);
  document.getElementById('fullScreen').setAttribute('title', `${hotkeyFullScreen.value}`);
  document.getElementById('saveGif').setAttribute('title', `${hotkeyGif.value}`);
}
hintsInit();
// ================================================================

const close = document.getElementById('close');
function addHidden() {
  hintsInit();
  document.getElementById('hotkeysContainer').classList.add('hidden');
  document.addEventListener('keydown', keysActivation);
}
close.addEventListener('click', addHidden);
