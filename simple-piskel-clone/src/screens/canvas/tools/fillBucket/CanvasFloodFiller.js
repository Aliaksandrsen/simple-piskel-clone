export default class CanvasFloodFiller {
  constructor() {
    this.cWidth = -1;
    this.cHeight = -1;

    this.rR = '0';
    this.rG = '0';
    this.rB = '0';
    this.rA = '0';

    this.nR = '0';
    this.nG = '0';
    this.nB = '0';
    this.nA = '0';

    this.data = null;

    this.floodFill = function floodFill(canvasContext, x, y, color) {
      this.cWidth = canvasContext.canvas.width;
      this.cHeight = canvasContext.canvas.height;

      this.nR = color.r;
      this.nG = color.g;
      this.nB = color.b;
      this.nA = color.a;

      const idata = canvasContext.getImageData(0, 0, this.cWidth, this.cHeight);
      const pixels = idata.data;
      this.data = pixels;

      const toReplace = this.getDot(x, y);
      this.rR = toReplace.r;
      this.rG = toReplace.g;
      this.rB = toReplace.b;
      this.rA = toReplace.a;

      if (+this.rR === +this.nR && +this.rG === +this.nG
        && +this.rB === +this.nB && +this.rA === +this.nA) {
        return;
      }
      this.effectiveFill(x, y);

      canvasContext.putImageData(idata, 0, 0);
    };

    this.findLeftPixel = function findLeftPixel(x, y) {
      let lx = x - 1;
      let dCoord = (y * this.cWidth * 4) + (lx * 4);

      while (lx >= 0 && this.data[dCoord] === this.rR && this.data[dCoord + 1] === this.rG
        && this.data[dCoord + 2] === this.rB && this.data[dCoord + 3] === this.rA) {
        this.data[dCoord] = this.nR;
        this.data[dCoord + 1] = this.nG;
        this.data[dCoord + 2] = this.nB;
        this.data[dCoord + 3] = this.nA;

        lx = -1 + lx;
        dCoord -= 4;
      }
      return lx + 1;
    };

    this.findRightPixel = function findRightPixel(x, y) {
      let rx = x;
      let dCoord = (y * this.cWidth * 4) + (x * 4);

      while (rx < this.cWidth && this.data[dCoord] === this.rR && this.data[dCoord + 1] === this.rG
        && this.data[dCoord + 2] === this.rB && this.data[dCoord + 3] === this.rA) {
        this.data[dCoord] = this.nR;
        this.data[dCoord + 1] = this.nG;
        this.data[dCoord + 2] = this.nB;
        this.data[dCoord + 3] = this.nA;

        rx = 1 + rx;
        dCoord += 4;
      }

      return rx - 1;
    };

    this.isNeededPixel = function isNeededPixel(x, y) {
      const dstart = (y * this.cWidth * 4) + (x * 4);
      const dr = this.data[dstart];
      const dg = this.data[dstart + 1];
      const db = this.data[dstart + 2];
      const da = this.data[dstart + 3];

      return (dr === this.rR && dg === this.rG && db === this.rB && da === this.rA);
    };
  }


  getDot(x, y) {
    const dstart = (y * this.cWidth * 4) + (x * 4);
    const dr = this.data[dstart];
    const dg = this.data[dstart + 1];
    const db = this.data[dstart + 2];
    const da = this.data[dstart + 3];

    return {
      r: dr,
      g: dg,
      b: db,
      a: da,
    };
  }

  effectiveFill(cx, cy) {
    const lineQueue = [];

    const fx1 = this.findLeftPixel(cx, cy);
    const fx2 = this.findRightPixel(cx, cy);

    lineQueue.push({ x1: fx1, x2: fx2, y: cy });

    while (lineQueue.length > 0) {
      const cLine = lineQueue.shift();
      let nx1 = cLine.x1;
      let nx2 = cLine.x1;
      let currx = nx2;


      if (cLine.y > 0) {
        if (this.isNeededPixel(cLine.x1, cLine.y - 1)) {
          nx1 = this.findLeftPixel(cLine.x1, cLine.y - 1);
          nx2 = this.findRightPixel(cLine.x1, cLine.y - 1);
          lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y - 1 });
        }

        currx = nx2;

        while (cLine.x2 >= nx2 && currx <= cLine.x2 && currx < (this.cWidth - 1)) {
          currx = 1 + currx;

          if (this.isNeededPixel(currx, cLine.y - 1)) {
            nx1 = currx;
            nx2 = this.findRightPixel(currx, cLine.y - 1);
            lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y - 1 });
            currx = nx2;
          }
        }
      }

      nx1 = cLine.x1;
      nx2 = cLine.x1;
      if (cLine.y < (this.cHeight - 1)) {
        if (this.isNeededPixel(cLine.x1, cLine.y + 1)) {
          nx1 = this.findLeftPixel(cLine.x1, cLine.y + 1);
          nx2 = this.findRightPixel(cLine.x1, cLine.y + 1);
          lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y + 1 });
        }

        currx = nx2;
        while (cLine.x2 >= nx2 && currx <= cLine.x2 && currx < (this.cWidth - 1)) {
          currx = 1 + currx;

          if (this.isNeededPixel(currx, cLine.y + 1)) {
            nx1 = currx;
            nx2 = this.findRightPixel(currx, cLine.y + 1);
            lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y + 1 });
            currx = nx2;
          }
        }
      }
    } // while (main loop)
  }
}
