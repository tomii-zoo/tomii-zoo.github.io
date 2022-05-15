// IDs
const ResultTextAreaID = "result";
const OpenFileID = "openfile";

// reqular expression pattern
const re = /function/;

let filename = "";

function setupEvents() {
  document.getElementById(OpenFileID).onchange = openFile;
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
    update_result(fileReader.result);
  };
}

function update_result(str) {
  // search lines
  console.log(`${filename}:`);
  const textarea = document.getElementById(ResultTextAreaID);
  const lines = str.split("\n");

  textarea.value = `filename: ${filename}\n`;
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
}

setupEvents();
