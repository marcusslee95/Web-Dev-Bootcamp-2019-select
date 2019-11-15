// alert("working");

// Want a random # between 1 ~ 6: 1. Math.random gives a # from 0 to 0.99..... 2. Multiply by 6 so to range of values is good aka. it's 0 - 5.999999 3. Floor aka. round down cuz don't want decimals 4. +1 to do 1 - 6
var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
document.querySelector(".dice .img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
document.querySelector(".dice .img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");

if (randomNumber1 === randomNumber2) {
  document.querySelector("h1").innerHTML = "Draw";
} else if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "🇯🇵Player 1 Wins";
} else {
  document.querySelector("h1").innerHTML = "🇰🇷Player 2 Wins";
}
