var prompt = require('prompt');
prompt.start();

function randomNumber() {
    var number = Math.floor(Math.random()*100);
    return number;
}
var number = randomNumber();

function numberGuess(){
    var answerArray =[];
    numberGuessArray(answerArray);
}
function numberGuessArray(answerArray){
    prompt.message = "Please guess a number: ".rainbow;
    prompt.get(['number'], function(err, result) {
        if(!err){
            if(answerArray.length < 3){
                if(number===result.number){
                    console.log("You have won");
                }
                if(number>result.number){
                    console.log("Your number is lower");
                    answerArray.push(result.number);
                    numberGuessArray(answerArray);
                }
                if(number<result.number){
                    console.log("Your number is higher");
                    answerArray.push(result.number);
                    numberGuessArray(answerArray);
                }
            }
            else{
            answerArray.push(result.number);
            console.log("You have lost the game. The number was " + number + " and your guesses were " + answerArray + ".");
            }
        }
        else{
            console.log("there was an error during the prompt");
        }
        
    });
}
    
numberGuess();
