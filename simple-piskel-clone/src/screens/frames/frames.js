document.getElementById('c1').addEventListener('click', () => {
  const canvas1 = document.getElementById('c1');
  const canvas2 = document.getElementById('c2');
  const ctx2 = canvas2.getContext('2d');
  ctx2.imageSmoothingEnabled = false;

  ctx2.drawImage(canvas1, 0, 0, 128, 128);
});
