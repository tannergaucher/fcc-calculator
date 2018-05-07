let buttons = document.getElementsByTagName("button");
let screen = document.getElementById("screen");
let equationDiv = document.getElementById("equation");

function buttonPress() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      let button = this.id;

      if (button === "AC") {
        clear();
      } else if (button === "=") {
        calculate();
      } else {
        screen.value += button;
      }
    });
  }
}
buttonPress();

function keyPress() {
  document.addEventListener("keyup", function(event) {
    event.preventDefault();
    let key = event.key;

    if (key === "Backspace") {
      clear();
    } else if (key === "Enter") {
      calculate();
    } else if (key === "=") {
      calculate();
    } else {
      var isButton = function(key) {
        let areButtons = /[0-9+-÷×]/;
        return key.match(areButtons);
      };
      if (isButton(key)) {
        document.getElementById(key).click();
      }
    }
  });
}
keyPress();

function displayEquation() {
  let equation = screen.value;
  equationDiv.innerHTML = equation;
}

function calculate() {
  displayEquation();
  let rawInput = screen.value;
  //handle special chars 
  let raw1 = rawInput.replace(/×/, "*");
  let raw2 = raw1.replace(/÷/, "/");
  //check for type number before eval 
  let answer = eval(raw2);

  //handle decimal places
  let strNum = answer.toString();
  let split = strNum.split(".");

  if (split.length === 1) {
    screen.value = answer;
  } else if (split.length > 1 && split[1].length < 5) {
    screen.value = answer;
  } else if (split[1].length >= 5) {
    //limit to 5 places
    let rounded = precision(answer);
    screen.value = rounded;
  }
}

function clear() {
  screen.value = null;
  equationDiv.innerHTML = "";
}

function precision(num) {
  return Number.parseFloat(num).toPrecision(12);
}