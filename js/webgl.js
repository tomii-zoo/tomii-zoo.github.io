window.onload = initGL;

function initGL() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  gl.clearColor(0.0, 0.0, 1.0, 0.5);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
