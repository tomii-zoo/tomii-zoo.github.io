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
      update_result();
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
    update_result();
  };
}

function update_input() {
  const textarea = document.getElementById(InputTextAreaID);
  re = new RegExp(textarea.value);
}

async function update_result() {
  const start = performance.now();

  const textarea = document.getElementById(ResultTextAreaID);
  const lines = filetext.split("\n");

  textarea.value = `Filename: ${filename}\n`;
  textarea.value += `Lines: ${lines.length}\n`;
  textarea.value += "\n";

  let is_match = false;
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) {
      is_match = true;
      textarea.value += `L${i}: ${lines[i]}\n`;
    }
  }

  if (!is_match) {
    textarea.value += "Not match";
  }

  const end = performance.now();
  console.log(`performance => ${(end - start).toFixed(3)}ms`);
}

setup();
