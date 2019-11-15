// alert("hello");

/*
// Creating a Button that listens for clicks
  // Step 1:
  // Create a function that's just mock for do something when button gets clicked
  // Step 2:
  // Add listening functionality to button and when event happens carry out the previous function
  function handleClick() {
    alert("I got clicked");
  }

  // Unpackaging this line of code: For the selected element add listening functionality for a click. And when clicked have it trigger handleClick() function
  var allTheButtons = document.querySelectorAll(".drum");
  for (var i = 0; i < allTheButtons.length; i++) {
    allTheButtons[i].addEventListener("click", handleClick);
  }

  // document.querySelector("button").addEventListener("click", handleClick);
  // Y not handleClick()? -> that would execute function AS Event Listener is added. Which is not what u want. U want function trigger when clicked
  // Anonymous Function way of doing this -> document.querySelector("button").addEventListener("click", function () {
  //   alert("I got clicked");
  // });
*/

//************PART1: Creating a Button that listens for clicks and gives audio AND also does some animation
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    // this.style.color = "white";
    makeSound(this.innerHTML);
    buttonAnimation(this.innerHTML);
    }
  );
}

// ******Part2:  Keyboard Listener
// Practice w/Keyboard Listeners
// document.addEventListener("keydown", function() {
//   alert("A Key was pressed");
// });

// Adding the "play different sounds part"
// document.addEventListener("keydown", function(event) {
//   console.log(event);
// });

document.addEventListener("keydown", function(event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});


function makeSound(someTrigger) {
  switch (someTrigger) {
    case "w":
      //play a sound
      var tom_1 = new Audio("sounds/tom-1.mp3");
      tom_1.play();
      break;
    case "a":
      var tom_2 = new Audio("sounds/tom-2.mp3");
      tom_2.play();
      break;
    case "s":
      var tom_3 = new Audio("sounds/tom-3.mp3");
      tom_3.play();
      break;
    case "d":
      var tom_4 = new Audio("sounds/tom-4.mp3");
      tom_4.play();
      break;
    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;
    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;
    case "l":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;
    default:
      console.log(someTrigger);
  }
}

function buttonAnimation(currentKey) {
  var currentButton = document.querySelector("." + currentKey); //Getting the html element someone clicked.... by it's innerHTML or the html element with the same inner values as the keyboard button they hit
  currentButton.classList.add("pressed"); //styling it to fade
  setTimeout(function() {
    currentButton.classList.remove("pressed");
  }, 100);
}
