var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var started=false;
var level=0;


function nextSequence(){
    userClickedPattern=[];
    level+=1;
    $("#level-title").text("Level "+ level);
    var randomNumber=Math.floor((Math.random() * 4));
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
       if(gamePattern.length===userClickedPattern.length)
       {
        setTimeout(function(){
            nextSequence();
        },1000);
       }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
   
   }

function startOver(){
level=0;
gamePattern=[];
started=false;

}

function animatePress(currentColour)
{
$("#" + currentColour).addClass("pressed");
setTimeout(function(){
   $("#" + currentColour).removeClass("pressed");
},100);
}


function playSound(name){
    var aud= new Audio("./sounds/"+ name +".mp3")
    aud.play();
 }


$(document).keypress(function(){
    if(!started)
    {
       $("#level-title").text("Level "+ level);
       nextSequence();
       started=true;
    }
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});




