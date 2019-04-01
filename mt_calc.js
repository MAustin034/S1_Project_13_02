"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Mickal Austin
   Date: 3-27-19  
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/
//As soon as the browser loads, the function 'init' loads as well.
window.onload = init;

//This function declares the local variable 'calcButton' & grabs all the elements with the class name of 'calcButton', nests a for loop that goes through the length of 'calcButton', & grabs the element with the id of 'calcWindow' & sets its value to the function 'calcKeys'.
function init() {
      var calcButton = document.getElementsByClassName("calcButton");
      for (var i = 0; i < calcButton.length; i++) {
            calcButton[i].onclick = buttonClick;
      }
      document.getElementById("calcWindow").onkeydown = calcKeys;
}

//The first three lines in this function declare the variables 'calcValue', 'calcDecimal', & 'buttonValue'.
function buttonClick(e) {
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value;
      var buttonValue = e.target.value;

      //This section of code creates a switch statement that has four cases that are for the four buttons 'del', 'bksp', 'enter', & 'prev' that are on the calculator. For the rest, the line of code below 'default' will be used instead.
      switch (buttonValue) {
            case "del":
                  calcValue = "";
                  break;
            case "bksp":
                  calcValue = eraseChar(calcValue);
                  break;
            case "enter":
                  calcValue += " = " + evalEq(calcValue, calcDecimal) + "\n";
                  break;
            case "prev":
                  calcValue = lastEq(calcValue);
                  break;
            default:
                  calcValue = calcValue + buttonValue;
                  break;
      }

      //This piece of code grabs the element with the id of 'calcWindow' & its value attribute & sets it to the value of 'calcValue'. It also focuses the cursor when it is over the calculator window (text area box).
      document.getElementById("calcWindow").value = calcValue;
      document.getElementById("calcWindow").focus();
}

//The first two lines in this function are the same as the first two in the 'buttonClick' function.
function calcKeys(e) {
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value;

      //This switch statement applies to the 'Delete', 'Enter', & up arrow keys on the keyboard, & when pressed, will run their given code blocks.
      switch (e.key) {
            case "Delete":
                  calcValue = "";
                  break;
            case "Enter":
                  calcValue += " = " + evalEq(calcValue, calcDecimal);
                  break;
            case "ArrowUp":
                  calcValue = lastEq(calcWindow.value);
                  e.preventDefault();
                  break;
      }

      //This line of code grabs the element with the id of 'calcWindow' & its value attribute & sets it to the value of the 'calcValue' variable.
      document.getElementById("calcWindow").value = calcValue;
}

/* ===================================================================== */

function eraseChar(textStr) {
      return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
      var lines = textStr.split(/\r?\n/);
      var lastLine = lines[lines.length - 1];
      var eqValue = eval(lastLine);
      return eqValue.toFixed(decimals);
}

function lastEq(textStr) {
      var lines = textStr.split(/\r?\n/);
      var lastExp = lines[lines.length - 2];
      return lastExp.substr(0, lastExp.indexOf("=")).trim();
}