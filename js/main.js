

let before = $('before')
const liner = $('liner')
const cursor = $('cursor')
const texter = $('texter');
const typer = $('typer');
const terminal = $('terminal');


setTimeout(() => {
  loopLines(Linux, "", 50);
}, 100);


texter.focus();
texter.addEventListener('blur', () => {
  setTimeout(() => {
    texter.focus();
  }, 0);
});





function displayText(key) {

  switch (key) {

    case 'Backspace':
      let cutted = typer.innerText.slice(0, -1);
      typer.innerText = '';
      output(cutted);
      break;

    case 'Enter':

      let value = texter.value.trim();
      if (value != 'clear') {
        console.log(value);
        addLine(`User@root~$ ${value}`, "")
      }
      executeCommand(value);


      typer.innerText = '';
      texter.value = '';
      //Do a command
      break;

    case ' ':
      output(' ');
      break;

    default:
      if (key == 'CapsLock' || key == 'Tab' || key == 'Meta' || key == 'Shift' || key == 'Alt' || key == 'Control')
        break;

      output(key);
      break;
  }
}

let output = (out) => {

  typer.innerText += out;

}


let addLine = (text, style, time) => {

  let t = ``;
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp";
      i++;
    } else {
      t += text.charAt(i);
    }
  }

  setTimeout(() => {
    let next = document.createElement("p");
    next.innerHTML = t;
    next.className = `${style}`;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);


  }, time);


}

let loopLines = (name, style, time) => {
  name.forEach((item, index) => {
    addLine(item, style, index * time);
  });


}

window.addEventListener('keydown', (e) => {
  console.log(e.key);
  displayText(e.key);
}, false);

let executeCommand = (cmd) => {
  switch (cmd) {
    case "clear":
      texter.value = '';
      typer.innerText = '';
      terminal.innerHTML = "<a id='before'></a>";
      before = $('before');
      break;

      case 'whoami':
        addLine("","",)
      break;
      case 'whois': 


      break;

      case 'contact': 
        loopLines(contact, "", 10); 
      break; 

    case 'linux':
      loopLines(Linux, "", 50);
      break;

    case 'smallLinux':
      loopLines(smallLinux, "", 30);
      break;


    case 'help':

      loopLines(help, "", 20);
      break;
    case 'github':
      window.open('https://github.com/0xf000000');
      break;
    default:
      texter.value = ''
      typer.innerText = ''
      addLine("<span>Sorry but this command doesnt exist. type 'help' to get all the avaible commands :) </span>", "", 20);
      break;
  }


}