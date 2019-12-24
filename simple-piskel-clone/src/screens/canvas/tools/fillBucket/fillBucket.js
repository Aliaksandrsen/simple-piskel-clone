import CanvasFloodFiller from './CanvasFloodFiller';
import {
  ctx,
  canvas,
  activeTool,
} from '../../index';

import {
  currentColorRGBA,
} from '../chooseColor/chooseColor';

const canvasFloodFiller = new CanvasFloodFiller();

function fillBucketClick(e) {
  if (activeTool === 'fillBucket') {
    canvasFloodFiller.floodFill(
      ctx,
      Math.floor(e.offsetX / (512 / canvas.width)),
      Math.floor(e.offsetY / (512 / canvas.height)),
      currentColorRGBA,
    );
  }
}

function fillBucket() {
  canvas.addEventListener('click', fillBucketClick);
}

export {
  fillBucket,
  fillBucketClick,
};
