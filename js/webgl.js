const VSHADER_CODE = `
  void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);  // 画面中央
    gl_PointSize = 10.0;  // 頂点サイズ
  }`;

const FSHADER_CODE = `
  void main() {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);  // RGBA（緑色）
  }`;

window.onload = initGL;

function initGL() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // gl.clearColor(0.0, 0.0, 1.0, 0.5);
  // gl.clear(gl.COLOR_BUFFER_BIT);

  const program = createProgramFromCode(gl, VSHADER_CODE, FSHADER_CODE);
  gl.useProgram(program);

  render(gl);
}

function render(gl) {
  gl.clearColor(0, 0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
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