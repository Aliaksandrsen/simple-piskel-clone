import {
  ctx,
  canvas,
  activeTool,
} from '../../index';


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

function hexToRgbA(hex) {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);

  return {
    r: red, g: green, b: blue, a: 255,
  };
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

// ======================= this is a tool
function RGBToHex(r, g, b) {
  let red = r.toString(16);
  let green = g.toString(16);
  let blue = b.toString(16);

  if (red.length === 1) { red = `0${red}`; }

  if (green.length === 1) { green = `0${green}`; }

  if (blue.length === 1) { blue = `0${blue}`; }

  return `#${red}${green}${blue}`;
}

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
