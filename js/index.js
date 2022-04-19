const LSKey = "edit"
const TextAreaID = "edit";
const FileNameID = "filename";
const InitializeValue = "input your text...";
const LSKeySelected = "LSKeyBox";

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
  const key = document.getElementById(LSKeySelected);

  const data = localStorage.getItem(key);
  if (data != null) {
    textarea.value = data;
  } else {
    textarea.value = InitializeValue;
  }
  console.log("load localstorage => " + textarea.value);
}

/**
 * Save Local Storage
 */
function saveLS() {
  const textarea = document.getElementById(TextAreaID);
  const key = document.getElementById(LSKeySelected);

  localStorage.setItem(key.value, textarea.value);
  console.log("save localstorage => " + textarea.value);

  //saved sign
  let p = document.createElement("p");
  p.textContent = "SAVED!";
  document.body.appendChild(p);

  //key value
  p = document.createElement("p");
  p.textContent = `${key.value} => ${textarea.value}`;
  document.body.appendChild(p);
}

/**
 * Clear Local Storage
 */
function clearLS() {
  localStorage.clear();
  loadLS();
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

function setList() {
  const sel = document.getElementById("list");

  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(`key => ${key}`);
    console.log(`value => ${localStorage[key]}`);

    // create dropdown
    const op = document.createElement("option");
    op.textContent = key;
    sel.appendChild(op);
  }
}
