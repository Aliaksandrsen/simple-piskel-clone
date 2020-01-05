import {
  ctx,
  canvas,
  activeTool,
} from '../../index';

import {
  RGBToHex,
  hexToRgbA,
  calculateCoordinates,
} from '../../../utils/utils';

import {
  CANVAS_PIXEL_SIZE,
  COLOR_GREEN,
  COLOR_BLACK,
} from '../../../../constants';


// colors
let currentColorHEX = localStorage.getItem('currentColorHEX') || COLOR_GREEN;
document.getElementById('current').value = currentColorHEX;
let prevColorHEX = localStorage.getItem('prevColorHEX') || COLOR_BLACK;
document.querySelector('.tools__button_prev').style.backgroundColor = prevColorHEX;

// default
let currentColorRGBA = JSON.parse(localStorage.getItem('currentColorRGBA')) || {
  r: 0, g: 255, b: 0, a: 255,
};
// default
let prevColorRGBA = JSON.parse(localStorage.getItem('prevColorRGBA')) || {
  r: 0, g: 0, b: 0, a: 255,
};


// !======================= this not a tool (this is for color panel)========================

function changePrevColor() {
  document.getElementById('prev').style.backgroundColor = currentColorHEX;
  prevColorHEX = currentColorHEX;
  prevColorRGBA = { ...currentColorRGBA };
}

document.getElementById('current').addEventListener('change', () => {
  changePrevColor();
  currentColorHEX = document.getElementById('current').value;
  currentColorRGBA = hexToRgbA(currentColorHEX);
});

document.getElementById('prev').addEventListener('click', () => {
  // set value
  document.getElementById('current').value = prevColorHEX;
  const bufCurrentColorHEX = currentColorHEX;
  const bufCurrentColorRGBA = { ...currentColorRGBA };

  currentColorHEX = prevColorHEX;
  currentColorRGBA = { ...prevColorRGBA };

  prevColorHEX = bufCurrentColorHEX;
  prevColorRGBA = { ...bufCurrentColorRGBA };

  document.getElementById('prev').style.backgroundColor = prevColorHEX;
});

// !===========================================================================================

function chooseColorInit(e) {
  if (activeTool === 'chooseColor') {
    // return X and Y coordinates
    const [X, Y] = calculateCoordinates(
      e.offsetX,
      e.offsetY,
      CANVAS_PIXEL_SIZE,
      canvas.width,
      canvas.height,
    );

    const pixelData = ctx.getImageData(X, Y, 1, 1);

    const rChanel = pixelData.data[0];
    const gChanel = pixelData.data[1];
    const bChanel = pixelData.data[2];

    // for use inside a function
    const bufCurrentColorHEX = currentColorHEX;
    const bufCurrentColorRGBA = { ...currentColorRGBA };

    currentColorHEX = RGBToHex(rChanel, gChanel, bChanel);
    currentColorRGBA = {
      r: `${rChanel}`, g: `${gChanel}`, b: `${bChanel}`, a: '255',
    };

    document.getElementById('current').value = currentColorHEX;

    prevColorHEX = bufCurrentColorHEX;
    prevColorRGBA = { ...bufCurrentColorRGBA };

    document.getElementById('prev').style.backgroundColor = prevColorHEX;
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
