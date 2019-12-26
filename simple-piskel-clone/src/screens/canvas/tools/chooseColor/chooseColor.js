import {
  ctx,
  canvas,
  activeTool,
} from '../../index';

import {
  RGBToHex,
  hexToRgbA,
} from './utils';

const COLOR_GREEN = '#00ff00';
const COLOR_BLACK = '#000000';

// colors
let currentColorHEX = localStorage.getItem('currentColorHEX') || COLOR_GREEN;
document.getElementById('current').value = currentColorHEX;
let prevColorHEX = localStorage.getItem('prevColorHEX') || COLOR_BLACK;
document.querySelector('.tools__button_prev').style.backgroundColor = prevColorHEX;

// по умолчанию
let currentColorRGBA = JSON.parse(localStorage.getItem('currentColorRGBA')) || {
  r: 0, g: 255, b: 0, a: 255,
};
// по умолчанию
let prevColorRGBA = JSON.parse(localStorage.getItem('prevColorRGBA')) || {
  r: 0, g: 0, b: 0, a: 255,
};


// !======================= this not a tool (this is for color panel)========================

function changePrevColor() {
  document.querySelector('#prev').style.backgroundColor = currentColorHEX;
  prevColorHEX = currentColorHEX;
  prevColorRGBA = { ...currentColorRGBA };
}

document.querySelector('#current').addEventListener('change', () => {
  changePrevColor();
  currentColorHEX = document.querySelector('#current').value;
  currentColorRGBA = hexToRgbA(currentColorHEX);
});

document.querySelector('#prev').addEventListener('click', () => {
  // устанавливает значение
  document.querySelector('#current').value = prevColorHEX;
  const bufCurrentColorHEX = currentColorHEX;
  const bufCurrentColorRGBA = { ...currentColorRGBA };

  currentColorHEX = prevColorHEX;
  currentColorRGBA = { ...prevColorRGBA };

  prevColorHEX = bufCurrentColorHEX;
  prevColorRGBA = { ...bufCurrentColorRGBA };

  document.querySelector('#prev').style.backgroundColor = prevColorHEX;
});

// !===========================================================================================


function chooseColorInit(e) {
  if (activeTool === 'chooseColor') {
    const [X, Y] = [
      Math.floor(e.offsetX / (512 / canvas.width)),
      Math.floor(e.offsetY / (512 / canvas.height)),
    ];

    const pixelData = ctx.getImageData(X, Y, 1, 1);

    const rChanel = pixelData.data[0];
    const gChanel = pixelData.data[1];
    const bChanel = pixelData.data[2];

    // для внутреннего использования внутни ф-ии
    const bufCurrentColorHEX = currentColorHEX;
    const bufCurrentColorRGBA = { ...currentColorRGBA };

    currentColorHEX = RGBToHex(rChanel, gChanel, bChanel);
    currentColorRGBA = {
      r: `${rChanel}`, g: `${gChanel}`, b: `${bChanel}`, a: '255',
    };

    document.querySelector('#current').value = currentColorHEX;

    prevColorHEX = bufCurrentColorHEX;
    prevColorRGBA = { ...bufCurrentColorRGBA };

    document.querySelector('#prev').style.backgroundColor = prevColorHEX;
  }
}

function chooseColor() {
  canvas.addEventListener('click', chooseColorInit);
}

window.addEventListener('unload', () => {
  localStorage.setItem('currentColorHEX', currentColorHEX);
  localStorage.setItem('prevColorHEX', prevColorHEX);

  localStorage.setItem('currentColorRGBA', JSON.stringify(currentColorRGBA));
  localStorage.setItem('prevColorRGBA', JSON.stringify(prevColorRGBA));
});


export {
  chooseColor,
  chooseColorInit,
  currentColorRGBA,
};
