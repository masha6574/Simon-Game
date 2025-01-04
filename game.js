var arr = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var userChosenColor;

$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence() {

    level++;

    $("h1").text("Level " + level);
    userClickedPattern=[];
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = arr[randomNum];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currColor) {
    $("#" + currColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currLevel){
    if(userClickedPattern[currLevel]===gamePattern[currLevel])
    {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else
    {
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        playSound("wrong");
        $("h1").text("Game Over ! Press any key to restart.");
        gameOver();
    }
}

$(".btn").on("click", function (event) {
    userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function gameOver(){
    level = 0;
    started=false;
    gamePattern=[];
}


