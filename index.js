const LSKey = "edit"
const TextAreaID = "edit";
const FileNameID = "filename";
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
  const data = localStorage.getItem(LSKey);
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
  localStorage.setItem(LSKey, textarea.value);
  console.log("save localstorage => " + textarea.value);
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
