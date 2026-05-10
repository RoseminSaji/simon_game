var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;  

$(document).on('keypress', function() {
    if (!started) {
        $("#level-title").text('Level ' + level);
        started = true;
        nextSequence();
    }
})

$('.btn').on('click', function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text('Level ' + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).fadeOut(100).fadeIn(100);
    $("." + currentColour).addClass("pressed").delay(100).removeClass("pressed");
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(() => {
          nextSequence();
        }, 2000);
    }
  } else{
    playSound("wrong");
    $("#level-title").text('Game Over, Press Any Key to Restart');
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 100);
    startOver();
  }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}