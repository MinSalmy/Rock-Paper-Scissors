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

let lang = document.getElementsByTagName('html')[0].getAttribute('lang'); //window.navigator.language.slice(0,2);

/* //попытка в автоматическую загрузку ру языка на ру компах
window.addEventListener('load ', () => {
    if (lang === "ru") {
        window.location = document.location.origin + '/ru/index.html';
    } else {
        window.location = document.location.origin + '/index.html';
    }
}, once = true);
console.log(lang);
console.log(document.location.href);
//lang = document.location.href.slice(-13, -11);
console.log(lang);
*/
console.log(document.getElementsByTagName('html')[0].getAttribute('lang'));
// получение языка страницы
/*
let langButtons = document.querySelectorAll('a');
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        ang = document.location.href.slice(-13, -11);
        if (lang !== "ru") lang = "en";
        console.log(lang);
    });
});
*/
// обнуление результатов игры
displayRoundResult("", "", -2);

// эффекты наводки мышки на кнопки
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

// раунд игры по клику
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

// вызов окна с результатом игры
function displayGameResult() {
    if (lang === "en") { 
        if (counterComputer === maxScore) {
            alert("Oh! You lost the game! Good luck next time. ♡(>ᴗ•)");
        }
        else if (counterPlayer === maxScore) {
            alert("OH YEA! You won the game! (─‿‿─)♡");
        }
    } else if (lang === "ru") {
        if (counterComputer === maxScore) {
            alert("Ой! Ты проиграл! Удачи в следующий раз. ♡(>ᴗ•)");
        }
        else if (counterPlayer === maxScore) {
            alert("ОУ ЕЕЕ! Ты победил! (─‿‿─)♡");
        }       
    }
    counterComputer = 0;
    counterPlayer = 0;
    displayRoundResult("", "", -2);
}


// добавление текста с результатом раунда игры
function displayRoundResult (playerSelection, computerSelection, result){
    let resultMessage = "";
    if (lang === "en") {
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
    } else if (lang === "ru") {
        // отвратительное ужасное решение, но в данным момент на другое нет времени
        let playerSelectionRU = "";        
        switch (playerSelection) {
            case "rock":
                playerSelectionRU = "Камень";
                break;
            case "paper":
                playerSelectionRU = "Бумага";
                break;           
            case "scissors":
                playerSelectionRU = "Ножницы";
                break; 
            case "lizard":
                playerSelectionRU = "Ящерица";
                break; 
            case "spock":
                playerSelectionRU = "Спок";
                break; 
        } 
        let computerSelectionRU = "";
        switch (computerSelection.toLowerCase()) {
            case "rock":
                computerSelectionRU = "камень";
                break;
            case "paper":
                computerSelectionRU = "бумага";
                break;           
            case "scissors":
                computerSelectionRU = "ножницы";
                break; 
            case "lizard":
                computerSelectionRU = "ящерица";
                break; 
            case "spock":
                computerSelectionRU = "спок";
                break; 
        } 
        switch (result) {        
            case -1: 
                resultMessage = `Ничего не произошло... Хотя... Подожди, ${playerSelectionRU} и ${computerSelectionRU} стали друзьями. ` + "(つ✧ω✧)つ <3 ⊂(´• ω •`⊂)";
                break;            
            case 0: 
                resultMessage = `${playerSelectionRU} - ${computerSelectionRU}. 1:0. Ты выиграл раунд. ＼(￣▽￣)／`;
                break;
            case 1: 
                resultMessage = `${playerSelectionRU} - ${computerSelectionRU}. 0:1. Компьютер выиграл раунд. ( 〃▽〃)`;
                break;
            default:
                resultMessage = "";
                break;
        }
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


// рандомизация выбора компьютера
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

// 1 раунд игры с выдачей результата в виде 1/0/-1
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
    // result meaning:
    // -1: draw
    // 0: player wins
    // 1: computer wins
    return result;
}

// функция для перевода текста в Заголовочный 
function toCamelCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}