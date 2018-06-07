var wordOptions =           
    [
        "CSHARP",
        "CPLUSPLUS",
        "RUBYONRAILS",
        "PYTHON",
        "JAVASCRIPT",
        "ANSIC",
        "COBOL",
        "FORTRAN",
        "VISUALBASIC",
        "COMPILER",
        "ALGORITHM",
        "QBASIC",
        "ASPNET",
        "FRAMEWORK",
    ];

const maxTries = 10;            

var guessedLetters = [];        
var currentWordIndex;          
var guessingWord = [];          
var remainingGuesses = 0;       
var hasFinished = false;             
var wins = 0;                   

//reset vars
function resetGame() {
    remainingGuesses = maxTries;

    currentWordIndex = Math.floor(Math.random() * (wordOptions.length));

//clear arrays
    guessedLetters = [];
    guessingWord = [];


    for (var i = 0; i < wordOptions[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }   

    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // Show display
    updateDisplay();
};

//  Update the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;


    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};



function evaluateGuess(letter) {
    
    var positions = [];

    for (var i = 0; i < wordOptions[currentWordIndex].length; i++) {
        if(wordOptions[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};


// Checks for a loss
function checkLoss()
{
    if(remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
}

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};

document.onkeydown = function(event) {
    // reset the game
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};