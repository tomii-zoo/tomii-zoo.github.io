// worker thread
const worker = new Worker('worker.js');
worker.addEventListener('message', (text) => {
  update_result(text);
});

// DOM IDs
const InputTextAreaID = "input";
const ResultTextAreaID = "result";
const OpenFileID = "openfile";

// reqular expression pattern
let re = new RegExp('function');

// fileinfo
let filename = "";
let filetext = "";

function setup() {
  document.getElementById(InputTextAreaID).oninput = () => {
    try {
      update_input();
      post_result();
    } catch(error) {
      const textarea = document.getElementById(ResultTextAreaID);
      textarea.value = error;
    }
  };
  document.getElementById(OpenFileID).onchange = openFile;

  update_input();
}

function openFile() {
  const element = document.getElementById(OpenFileID);
  const files = element.files;
  
  //ファイル読み込み
  const file = files[0];
  filename = element.value;
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = () => {
    filetext = fileReader.result;
    post_result();
  };
}

function update_input() {
  const textarea = document.getElementById(InputTextAreaID);
  re = new RegExp(textarea.value);
}

function post_result() {
  postMessage(re, filetext);
}

function update_result(text) {
  textarea.value = text;
}

setup();
