function addScript(){

   // Create the element
   var script = document.createElement("script");
 
   // Add script content
   var cm = document.querySelector('.CodeMirror').CodeMirror;
   script.innerHTML = cm.getValue();
   script.onreadystatechange = document.getElementById("code").value;
 
   // Append
   document.body.appendChild(script);
} 
function reset(){
   var cm = document.querySelector('.CodeMirror').CodeMirror;
   cm.setValue("");
   cm.clearHistory();
}
window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1){
      alert('The code you entered is undefined, try again.');
    } else {
      var message = "There is an error in your code, please try again.";
 
      alert(message);
    }
  
    return false;
  };

// code from codeMirror
window.onload = function() {
   
    var cm = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    indentUnit: 4,
    indentWithTabs: false,
    theme: "lucario",
    mode: "javascript",
    autoCloseBrackets: true,
    extraKeys: {
       // the following Tab key mapping is from http://codemirror.net/doc/manual.html#keymaps
       Tab: function(cm) {
          var spaces = new Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection(spaces);
       }
    }
 });
}