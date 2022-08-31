let buttons = document.querySelectorAll(".btn");
let playerSelection = "";
let computerSelection = "";
let counterPlayer = 0;
let counterComputer = 0;
const maxScore = 5;
const divRoundsResults = document.querySelector(".game-container");
const h2RoundResult = document.createElement("h2");
const h2ComputerScore = document.createElement("h2");
const h2PlayerScore = document.createElement("h2");

displayRoundResult("", "", -2);

buttons.forEach((button) => {
    button.addEventListener('mouseover', function(e) { 
        button.classList.add('entering');
    });
});

buttons.forEach((button) => {
    button.addEventListener('mouseout', function(e) { 
        button.classList.remove('entering');
    });
});

buttons.forEach((button) => {
    button.addEventListener('click', () => { 
        playerSelection = button.id;
        computerSelection = getComputerChoice();
        let gameResult = playRound(playerSelection, computerSelection);
        if (gameResult == 1) counterComputer++;
        else if (gameResult == 0) counterPlayer++;
        if (counterComputer === maxScore || counterPlayer === maxScore) 
            displayGameResult();
        else
            displayRoundResult(playerSelection, computerSelection, gameResult);
    });
});

function displayGameResult() {
    if (counterComputer === maxScore) {
        alert("Oh! You lost the game! Good luck next time. ♡(>ᴗ•)");
    }
    else if (counterPlayer === maxScore) {
        alert("OH YEA! You won the game! (─‿‿─)♡");
    }
    counterComputer = 0;
    counterPlayer = 0;
    displayRoundResult("", "", -2);
}

function displayRoundResult (playerSelection, computerSelection, result){
    let resultMessage = "";
    switch (result) {        
        case -1: 
            resultMessage = `Nothing happened. Although... Wait, ${playerSelection} and ${computerSelection} became friends. ` + "(つ✧ω✧)つ <3 ⊂(´• ω •`⊂)";
            break;            
        case 0: 
            resultMessage = `${toCamelCase(playerSelection)} beats ${computerSelection}. You won the round. ＼(￣▽￣)／`;
            break;
        case 1: 
            resultMessage = `${toCamelCase(computerSelection)} beats ${playerSelection}. The computer won the round. ( 〃▽〃)`;
            break;
        default:
            resultMessage = "";
            break;
    }

    h2RoundResult.textContent = resultMessage;
    divRoundsResults.appendChild(h2RoundResult);
    
    const divComputerScore = document.querySelector(".computer-score");
    h2ComputerScore.textContent = counterComputer.toString();
    divComputerScore.appendChild(h2ComputerScore);

    const divPlayerScore = document.querySelector(".player-score");
    h2PlayerScore.textContent = counterPlayer.toString();
    divPlayerScore.appendChild(h2PlayerScore);

}

function getComputerChoice() {
    const maxNumber = 5;
    const minNumber = 1;
    let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
    switch (randomNumber) {
        case 1: return "Rock";
        case 2: return "Paper";
        case 3: return "Scissors";
        case 4: return "Lizard";
        case 5: return "Spock";
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    let result;

    switch (playerSelection) {
        case computerSelection: 
            result = -1;
            break;
        case "rock":
            if (computerSelection == "paper" || computerSelection == "spock") result = 1;
            else result = 0;
            break;
        case "paper":
            if (computerSelection == "scissors" || computerSelection == "lizard") result = 1;
            else result = 0;
            break;           
        case "scissors":
            if (computerSelection == "rock" || computerSelection == "spock") result = 1;
            else result = 0;
            break; 
        case "lizard":
            if (computerSelection == "scissors" || computerSelection == "rock") result = 1;
            else result = 0;
            break; 
        case "spock":
            if (computerSelection == "lizard" || computerSelection == "paper") result = 1;
            else result = 0;
            break; 
    }
    // -1: draw
    // 0: player wins
    // 1: computer wins
    switch (result) {
        case -1: 
            console.log("Draw");
            break;            
        case 0: 
            console.log("The player won the round");
            break;
        case 1: 
            console.log("The computer won the round");
            break;
    }
    return result;
}

function toCamelCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function game() {
    let counterPlayer = 0;
    let counterComputer = 0;
    for (let round = 0; round < 5; round++) {
        let playerSelection = prompt("Rock, paper or scissors?");
        let gameResult = playRound(playerSelection, getComputerChoice());
        if (gameResult == 1) counterComputer++;
        else if (gameResult == 0) counterPlayer++;
    }
    if (counterComputer == counterPlayer) console.log("No one wins the game");
    else if (counterComputer > counterPlayer) console.log("The computer won the game");
    else console.log("The player won the game");
}


