"use strict";

let input = document.getElementById('input'); // input / output
let numbers = document.querySelectorAll('.numbers div');
let operators = document.querySelectorAll('.operators');
let result = document.getElementById('result'); // btn equal
let clear = document.getElementById('clear'); //btn clear
let resultDisplayed = false;

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function(e) {

        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        // if result is not diplayed, just keep adding
        if (resultDisplayed == false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            // if result is currently displayed and user pressed an operator
            // we need to keep on adding to the string for next operation
            result = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            // if result is currently displayed and user pressed a number
            // we need clear the input string and add the new input to start the new opration
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
    
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function(e){
        // storing current input string and its last character in variables - used later
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        // if last character entered is an operator, replace it with the currently pressed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            // if first key pressed is an opearator, don't do anything
            console.log("enter a number first");
        } else {
            // else just add the operator pressd to the input
            input.innerHTML += e.target.innerHTML;
        }
    });
}

    // on click of 'equal' btn
result.addEventListener("click", function() {

    //this is the string that we will be processing eg. -10+26+33-56*34/23
    let inputString = input.innerHTML;

    //forming an array of numbers. eg. for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    let numbers = inputString.split(/\+|\-|\×|÷/g);

    // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
   // first we replace all the numbers and dot with empty string and then split
    let operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("-----------------------------");
    

    let divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");        
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
      operators.splice(multiply, 1);
      multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
      numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
      operators.splice(subtract, 1);
      subtract = operators.indexOf("-");
  }

    var add = operators.indexOf("+");
    while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
      numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
      operators.splice(add, 1);
      add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if resultis displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
});