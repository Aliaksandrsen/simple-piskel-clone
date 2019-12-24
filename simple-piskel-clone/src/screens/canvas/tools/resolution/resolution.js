import {
  ctx,
  canvas,
} from '../../index';


const changeResolution32 = function changeResolution() {
  const toDataURLImg = canvas.toDataURL();
  localStorage.setItem('lastImage', toDataURLImg);

  const RESOLUTION = '32';
  canvas.width = RESOLUTION;
  canvas.height = RESOLUTION;
  // use localStorage
  localStorage.setItem('resolution', RESOLUTION);


  (function firstInitImage() {
    const toDataURLImg1 = localStorage.getItem('lastImage');

    if (toDataURLImg1 === null) { return; }

    const img = new Image();
    img.onload = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, RESOLUTION, RESOLUTION);
    };
    img.src = toDataURLImg1;
  }());
};


const changeResolution64 = function changeResolution() {
  const toDataURLImg = canvas.toDataURL();
  localStorage.setItem('lastImage', toDataURLImg);

  const RESOLUTION = '64';
  canvas.width = RESOLUTION;
  canvas.height = RESOLUTION;
  // use localStorage
  localStorage.setItem('resolution', RESOLUTION);

  (function firstInitImage() {
    const toDataURLImg1 = localStorage.getItem('lastImage');

    if (toDataURLImg1 === null) { return; }

    const img = new Image();
    img.onload = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, RESOLUTION, RESOLUTION);
    };
    img.src = toDataURLImg1;
  }());
};


const changeResolution128 = function changeResolution() {
  const toDataURLImg = canvas.toDataURL();
  localStorage.setItem('lastImage', toDataURLImg);

  const RESOLUTION = '128';
  canvas.width = RESOLUTION;
  canvas.height = RESOLUTION;
  // use localStorage
  localStorage.setItem('resolution', RESOLUTION);

  (function firstInitImage() {
    const toDataURLImg1 = localStorage.getItem('lastImage');

    if (toDataURLImg1 === null) { return; }

    const img = new Image();
    img.onload = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, RESOLUTION, RESOLUTION);
    };
    img.src = toDataURLImg1;
  }());
};


export {
  changeResolution32,
  changeResolution64,
  changeResolution128,
};
