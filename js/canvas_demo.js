let canvas = null;
let context = null;
let imgPlayer = null;

let x = 180;
let y = 180;
const w = 100;
const h = 100;

const MoveFrame = 20;

window.onload = setup;

function setup() {
  canvas = document.querySelector('#canvas2d');
  context = canvas.getContext('2d');

  imgPlayer = new Image();
  imgPlayer.src = 'crystal_400x400.png';
  imgPlayer.onload = () => {
    document.addEventListener("keydown", OnKeyDown);
    window.requestAnimationFrame(render);
  }
}

function render(timestamp) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const s = 100 * Math.sin(timestamp * 0.004);
  context.drawImage(imgPlayer, x, y + s, w, h);

  context.font = "18px Arial";
  context.fillStyle = "white";
  context.fillText('WASD : Move', 350, 460);

  const seconds = timestamp * 0.001;
  context.fillText(`Time => ${seconds.toFixed(2)}`, 350, 30);

  window.requestAnimationFrame(render);
}

function OnKeyDown(event) {
  console.log(event.key);

  // check keys
  if (event.key == 'ArrowRight' || event.key == 'd') {
    x += MoveFrame;
    if (x >= canvas.width) {
      x = 0;
    }
  }
  if (event.key == 'ArrowLeft' || event.key == 'a') {
    x -= MoveFrame;
    if (x <= 0) {
      x = canvas.width;
    }
  }
  if (event.key == 'ArrowUp' || event.key == 'w') {
    y -= MoveFrame;
    if (y <= 0) {
      y = canvas.height;
    }
  }
  if (event.key == 'ArrowDown' || event.key == 's') {
    y += MoveFrame;
    if (y >= canvas.height) {
      y = 0;
    }
  }

  if (event.key == 'z') {
    y += MoveFrame;
    if (y >= canvas.height) {
      y = 0;
    }
  }

  if (event.key == 'x') {
    y += MoveFrame;
    if (y >= canvas.height) {
      y = 0;
    }
  }

  if (event.key == 'c') {
    y += MoveFrame;
    if (y >= canvas.height) {
      y = 0;
    }
  }
}
