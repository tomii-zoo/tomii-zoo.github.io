const LSKey = "edit"
const TextAreaID = "edit";
const InitializeValue = "input your text...";

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
