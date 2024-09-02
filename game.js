var gamePattern=[];
var userClickedPattern= [];

var buttonColor = ["red", "blue", "green", "yellow"];

function nextSequence() {

    level++;
    $("h1").text("level " + level); 
    userClickedPattern=[];


    var num= Math.floor(Math.random()*4);
    var randomChosenColor= buttonColor[num];
    gamePattern.push(randomChosenColor);

    //flash the selected box
    $("#" + randomChosenColor).fadeOut(50).fadeIn(50);

    //playing audio on selected box\
    playSound(randomChosenColor);
   
    
}

var started= false;
var level=0;

$(document).on("keydown", function () {

  
    if(started==false) {
        $("h1").text("level " + level);
        nextSequence();
        started= true;
    }
})


function  playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();    
}

function animatePress(currColor) {
    $(currColor).addClass("pressed");

    setTimeout(function () {
        $(currColor).removeClass("pressed");        
    }, 200);


}

$(".btn").on("click", function (event) {
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress( "#" + userChosenColor);
    checkAnswer(userClickedPattern.length -1);

  })
  


  function checkAnswer (currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence() }, 1000);
            
  
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

  }


function startOver() {

    $(document).on("keydown", function () {

    level=0;
    gamePattern=[];
    started=false;
    nextSequence();
    });

}



