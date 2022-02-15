var buttonColors = ["red", "blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// jQuery detects if any key is pressed (eventListener), start the 1st round game
$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

// jQuery to add player clicked color to pattern (eventListener)
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // check player pattern with answer pattern
    checkAnswer(userClickedPattern.length - 1);
})

// check user pattern and given game pattern, if they are the same
function checkAnswer(currentLevel) {
    // patterns match, go to next game sequence
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else { //pattern doesn't match, display Game Over
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        // reset everyting
        startOver();
    }
}

// this function works on presenting the color pattern to player
function nextSequence() {
    // every time a new round starts, reset the user clicked pattern to add new pattern
    userClickedPattern = [];
    level++;
    // changing the game level number
    $("#level-title").text("Level" + level);

    // generate a random color and add it to gamePattern that present to player
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    // add an animation and sound effecr to present color pattern
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


// we want to simulate pressing button efffect since palyer jsut clicks
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// reset everything
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}