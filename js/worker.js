onmessage = function(e) {
  console.log("worker works✅");
  let re = new RegExp(e.data[0]);
  let filetext = e.data[1];

  let text = "";
  const start = performance.now();
  const lines = filetext.split("\n");

  text = `Filename: ${filename}\n`;
  text += `Lines: ${lines.length}\n`;
  text += "\n";
  
  let is_match = false;
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) {
      is_match = true;
      text += `L${i}: ${lines[i]}\n`;
    }
  }

  if (!is_match) {
      text += "Not match";
  }

  const end = performance.now();
  console.log(`performance => ${(end - start).toFixed(3)}ms`);    

  postMessage(text);
}