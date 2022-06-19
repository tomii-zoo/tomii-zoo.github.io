const VSHADER_CODE = `
attribute vec4 pos;

void main() {
  gl_Position = pos;
}`;

const FSHADER_CODE = `
precision mediump float;
uniform float time;

void main() {
  gl_FragColor = vec4(sin(time), cos(time), sin(time), 1.0);
}`;

const vertices = new Float32Array([
  0.0, 0.5,    // 1つ目の頂点座標
  -0.5, -0.5,  // 2つ目の頂点座標
  0.5, -0.5    // 3つ目の頂点座標
]);

let t = 0;

window.onload = initGL;

let canvas = null;
let gl = null;
let program = null;
let animationHandle = null;

/**
 * WebGL初期化処理
 */
function initGL() {
  document.getElementById("fs").value = FSHADER_CODE;
  document.getElementById("vs").value = VSHADER_CODE;

  document.getElementById("run").onclick = reloadGL;
  document.getElementById("rest").onclick = initGL;

  canvas = document.querySelector('#glcanvas');
  gl = canvas.getContext('webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  program = createProgramFromCode(gl, VSHADER_CODE, FSHADER_CODE);
  gl.useProgram(program);

  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    throw Error('Failed to create the buffer object.');
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);  
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(program, 'pos');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  window.cancelAnimationFrame(animationHandle);
  renderloop();
}

/**
 * WebGL再初期化処理
 */
function reloadGL() {
  let fs = document.getElementById("fs").value;
  let vs = document.getElementById("vs").value;

  canvas = document.querySelector('#glcanvas');
  gl = canvas.getContext('webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  program = createProgramFromCode(gl, vs, fs);
  gl.useProgram(program);

  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    throw Error('Failed to create the buffer object.');
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);  
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(program, 'pos');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  
  window.cancelAnimationFrame(animationHandle);
  renderloop();
}

/**
 * 描画ループ処理
 */
function renderloop(timeStamp) {
  var time = gl.getUniformLocation(program, "time");
  gl.uniform1f(time, timeStamp / 1000.0);

  gl.clearColor(0, 0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
  animationHandle = window.requestAnimationFrame(renderloop);
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (shader == null) {
    console.error('Failed to create a shader');
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // コンパイル結果を検査する
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var log = gl.getShaderInfoLog(shader);
    console.error('Failed to compile a shader\n' + log);
    alert('Failed to compile a shader\n' + log);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl, vshader, fshader) {
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vshader);
  gl.deleteShader(vshader);
  gl.attachShader(program, fshader);
  gl.deleteShader(fshader);
  gl.linkProgram(program);

  // リンクエラーの確認
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var log = gl.getProgramInfoLog(program);
    console.error('Failed to link a program\n' + log);
    alert('Failed to link a program\n' + log);
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function createProgramFromCode(gl, vshaderCode, fshaderCode) {
  const vshader = createShader(gl, gl.VERTEX_SHADER, vshaderCode);
  if (!vshader) {
    return null;
  }

  const fshader = createShader(gl, gl.FRAGMENT_SHADER, fshaderCode);
  if (!fshader) {
    gl.deleteShader(vshader);
    return null;
  }

  return createProgram(gl, vshader, fshader);
}
