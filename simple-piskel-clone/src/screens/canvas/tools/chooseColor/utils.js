function RGBToHex(r, g, b) {
  let red = r.toString(16);
  let green = g.toString(16);
  let blue = b.toString(16);

  if (red.length === 1) { red = `0${red}`; }

  if (green.length === 1) { green = `0${green}`; }

  if (blue.length === 1) { blue = `0${blue}`; }

  return `#${red}${green}${blue}`;
}

function hexToRgbA(hex) {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);

  return {
    r: red, g: green, b: blue, a: 255,
  };
}

export { RGBToHex, hexToRgbA };
