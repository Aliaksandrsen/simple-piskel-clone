import { RGBToHex, hexToRgbA } from './utils';


describe('RGB color to HEX color', () => {
  test('undefined', () => {
    const c1 = 100;
    const c2 = 255;
    const c3 = 0;
    expect(RGBToHex(c1, c2, c3)).toBeDefined();
  });
  test('should contain #', () => {
    const c1 = 200;
    const c2 = 225;
    const c3 = 20;
    expect(RGBToHex(c1, c2, c3)).toMatch(/#/);
  });
  test('should return color in HEX format', () => {
    expect(RGBToHex(255, 255, 255)).toBe('#ffffff');
    expect(RGBToHex(0, 0, 0)).toBe('#000000');
    expect(RGBToHex(255, 128, 0)).toBe('#ff8000');
  });
});


describe('HEX color to RGB color', () => {
  test('undefined', () => {
    const c = '#9900ff';
    expect(hexToRgbA(c)).toBeDefined();
  });
  test('should return color in RGBA format', () => {
    expect(hexToRgbA('#408080')).toEqual({
      r: 64, g: 128, b: 128, a: 255,
    });
    expect(hexToRgbA('#0000ff')).toEqual({
      r: 0, g: 0, b: 255, a: 255,
    });
    expect(hexToRgbA('#ff0000')).toEqual({
      r: 255, g: 0, b: 0, a: 255,
    });
  });
});
