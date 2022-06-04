let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

var userClickedPattern = [];
let level = 0;

//
let started = false;
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text(`level${level}`);
    nextSequence();

    started = true;
  }
});

$(".btn").click(function () {
  //btn that user choose

  var userChosenColour = $(this).attr("id");
  //******************* */
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game Over,Press Any Key to Restart");
    let n = "wrong";
    playWrongSound(n);
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

//AI Section
//randomMath

function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  //   //dont randomNumber return early
  //   //random color in array
  let randomChosenColour = buttonColors[randomNumber];
  //   //dont need to create let gamePattern ,can use gamePattern.push
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  // if(nextSequence()){
  //   level+1
  // }else{

  // }
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}
//User section
//user click animation button
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
function playWrongSound(result) {
  let audio = new Audio(`sounds/${result}.mp3`);
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
