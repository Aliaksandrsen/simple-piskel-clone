import CanvasFloodFiller from './CanvasFloodFiller';
import {
  ctx,
  canvas,
  activeTool,
} from '../../index';

import {
  currentColorRGBA,
} from '../chooseColor/chooseColor';

import { CANVAS_PIXEL_SIZE } from '../../../../constants';


const canvasFloodFiller = new CanvasFloodFiller();

function fillBucketClick(e) {
  if (activeTool === 'fillBucket') {
    canvasFloodFiller.floodFill(
      ctx,
      Math.floor(e.offsetX / (CANVAS_PIXEL_SIZE / canvas.width)),
      Math.floor(e.offsetY / (CANVAS_PIXEL_SIZE / canvas.height)),
      currentColorRGBA,
    );
  }
}

function fillBucket() {
  canvas.addEventListener('mousedown', fillBucketClick);
}

export {
  fillBucket,
  fillBucketClick,
};
