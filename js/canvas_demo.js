let canvas = null;
let context = null;
let img = null;

let x = 10;
let y = 10;
const w = 100;
const h = 100;
const MoveFrame = 20;

window.onload = setup;

function setup() {
  canvas = document.querySelector('#canvas2d');
  context = canvas.getContext('2d');

  img = new Image();
  img.src = 'crystal_400x400.png';
  img.onload = () => {
    document.addEventListener("keydown", OnKeyDown);
    render();
  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, y, w, h);
}

function OnKeyDown(event) {
  console.log(event.key);

  if (event.key == 'ArrowRight') {
    x += MoveFrame;
  }
  if (event.key == 'ArrowLeft') {
    x -= MoveFrame;
  }
  if (event.key == 'ArrowUp') {
    y -= MoveFrame;
  }
  if (event.key == 'ArrowDown') {
    y += MoveFrame;
  }

  render();
}