const LSKey = "edit"
const TextAreaID = "edit";
const FileNameID = "filename";
const OpenFileID = "openfile";

// Button IDs
const ButtonExportID = "export";
const ButtonSaveID = "save";
const ButtonLoadID = "load";

const ButtonEvaluateID = "evaluate";
const ButtonBinaryID = "binary";
const ButtonClearID = "clear";

const InitializeValue = "input your text...";

/**
 * Reference TextArea Value
 */
function getFilename() {
  const textbox = document.getElementById(FileNameID);
  return textbox.value;
}

/**
 * Reference TextArea Value
 */
function getTextAreaValue() {
  const textarea = document.getElementById(TextAreaID);
  return textarea.value;
}

/**
 * Load Local Storage
 */
function loadLS() {
  const textarea = document.getElementById(TextAreaID);

  textarea.value = localStorage.getItem(LSKey);
  console.log("load localstorage => " + textarea.value);
}

/**
 * Save Local Storage
 */
function saveLS() {
  const textarea = document.getElementById(TextAreaID);
  const key = LSKey;

  localStorage.setItem(key, textarea.value);
  console.log("save localstorage => " + textarea.value);

  //saved sign
  let p = document.createElement("p");
  p.textContent = "SAVED!";
  document.body.appendChild(p);

  //key value
  p = document.createElement("p");
  p.textContent = `${key} => ${textarea.value}`;
  document.body.appendChild(p);
  printLS();
}

/**
 * Clear Local Storage
 */
function clearLS() {
  localStorage.clear();
  loadLS();
}

function initialize() {
  loadLS();
  setupEvents();
}

/**
 * Download as textfile
 */
function downloadText() {
  const text = getTextAreaValue();
  const blobedText = new Blob([text], {type: 'text/plain'});
  const url = URL.createObjectURL(blobedText);
  const link = document.createElement('a');
  link.href = url;
  link.download = getFilename();
  link.value = "downloadlink";
  link.click();
}

function openFile() {
  let element = document.getElementById(OpenFileID);
  let files = element.files;
  
  //ファイル読み込み
  var file = files[0];
  var fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = () => {
    const textarea = document.getElementById(TextAreaID);
    textarea.value = fileReader.result;
  };
}

function evaluateJS() {
  const text = getTextAreaValue();
  const out = eval(text);

  let p = document.createElement("p");
  p.textContent = out;
  document.body.appendChild(p);
}

function to_binary() {
  const text = getTextAreaValue();
  const binaryStringArrays = Array.from((new TextEncoder('utf-8')).encode(text)).map(v => v.toString(16).toUpperCase())
  const textarea = document.getElementById(TextAreaID);
  textarea.value = binaryStringArrays;
}

function printLS() {
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(`key => ${key}`);
    console.log(`value => ${localStorage[key]}`);
  }
}

function setupEvents() {
  document.getElementById(OpenFileID).onchange = openFile;

  document.getElementById(ButtonExportID).onclick = downloadText;
  document.getElementById(ButtonSaveID).onclick = saveLS;
  document.getElementById(ButtonLoadID).onclick = loadLS;
  document.getElementById(ButtonEvaluateID).onclick = evaluateJS;
  document.getElementById(ButtonBinaryID).onclick = to_binary;
  document.getElementById(ButtonClearID).onclick = clearLS;

  document.getElementById(TextAreaID).onkeydown = function(e) { 
    onPressTabKey(e, this);
  }
}

function onPressTabKey( e, obj ) {
  if ( e.keyCode != 9 ) {
    return;
  }

  e.preventDefault();
  const cursorPosition = obj.selectionStart;
  const cursorLeft     = obj.value.substr( 0, cursorPosition );
  const cursorRight    = obj.value.substr( cursorPosition, obj.value.length );

  obj.value = cursorLeft + "\t" + cursorRight;
  obj.selectionEnd = cursorPosition+1;
}
