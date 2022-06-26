const INIT_FSHADER_CODE = `
precision highp float;
varying highp vec2 vTextureCoord;

      uniform sampler2D uSampler;

      void main(void) {
        gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
      }`;

const INIT_VSHADER_CODE = `
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying highp vec2 vTextureCoord;

void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  vTextureCoord = aTextureCoord;
}`

const vertices = new Float32Array([
  1.0, 1.0,
  1.0, -1.0,
  -1.0, 1.0,

  -1.0, 1.0,
  1.0, -1.0,
  -1.0, -1.0,
]);

let canvas = null;
let gl = null;
let program = null;
let animationHandle = null;

const FSID = "fs";
const VSID = "vs";

const ButtonRunID = "run";
const ButtonSaveID = "save";
const ButtonResetID = "reset";

let cubeTexture = null;

window.onload = setup;

/**
 * エントリポイント
 */
function setup() {
  document.getElementById(ButtonRunID).onclick = reloadGL;
  document.getElementById(ButtonSaveID).onclick = saveLS;
  document.getElementById(ButtonResetID).onclick = clearLS;

  loadLS();
  reloadGL();
}

function reloadGL() {
  let fs = document.getElementById(FSID).value;
  let vs = document.getElementById(VSID).value;

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
  
  const textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
  gl.enableVertexAttribArray(textureCoordAttribute);


  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
  gl.uniform1i(gl.getUniformLocation(program, "uSampler"), 0);

  initTextures();
  cubeVerticesTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesTextureCoordBuffer);

  var textureCoordinates = [
    // 前面
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // 背面
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // 上面
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // 底面
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // 右側面
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // 左側面
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                gl.STATIC_DRAW);

  window.cancelAnimationFrame(animationHandle);
  renderloop();
}

function renderloop(timeStamp) {
  var time = gl.getUniformLocation(program, "time");
  gl.uniform1f(time, timeStamp / 1000.0);

  var resolution = gl.getUniformLocation(program, "resolution");
  gl.uniform2f(resolution, canvas.width, canvas.height);

  gl.clearColor(0, 0, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
  gl.drawArrays(gl.TRIANGLE_STRIP, 3, 3);
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
  program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vshader);
  gl.deleteShader(vshader);
  gl.attachShader(program, fshader);
  gl.deleteShader(fshader);
  gl.linkProgram(program);

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

function saveLS() {
  const valueFS = document.getElementById(FSID).value;
  localStorage.setItem(FSID, valueFS);
  console.log("save localstorage => " + valueFS);

  const valueVS = document.getElementById(VSID).value;
  localStorage.setItem(VSID, valueVS);
  console.log("save localstorage => " + valueVS);

  const p = document.createElement("p");
  p.textContent = "SAVED!";
  document.body.appendChild(p);
}

function clearLS() {
  localStorage.clear();
  loadLS();
  reloadGL();
}

function loadLS() {
  const textareaFS = document.getElementById(FSID);
  const textareaVS = document.getElementById(VSID);

  const fs_savedata = localStorage.getItem(FSID);
  if (fs_savedata == null) {
    textareaFS.value = INIT_FSHADER_CODE;
  } else {
    textareaFS.value = fs_savedata;
  }
  console.log("loaded => " + textareaFS.value);

  const vs_savedata = localStorage.getItem(VSID);
  if (vs_savedata == null) {
    textareaVS.value = INIT_VSHADER_CODE;
  } else {
    textareaVS.value = vs_savedata;
  }
  console.log("loaded => " + textareaVS.value);
}

function initTextures() {
  cubeTexture = gl.createTexture();
  cubeImage = new Image();
  cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
  cubeImage.src = "crystal_128x128.png";
}

function handleTextureLoaded(image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}
