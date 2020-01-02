import {
  ctx,
  canvas,
} from '../../index';


export default function changeResolution() {
  const toDataURLImg = canvas.toDataURL();
  localStorage.setItem('lastImage', toDataURLImg);

  // take from data attributes
  const RESOLUTION = this.dataset.res;
  canvas.width = RESOLUTION;
  canvas.height = RESOLUTION;

  localStorage.setItem('resolution', RESOLUTION);

  const toDataURLImg1 = localStorage.getItem('lastImage');

  if (toDataURLImg1 === null) { return; }

  const img = new Image();
  img.onload = () => {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, RESOLUTION, RESOLUTION);
  };
  img.src = toDataURLImg1;
}
