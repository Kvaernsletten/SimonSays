let app = document.getElementById('app');
let gameRunning = false;
let score = "0";
let highscore = "0";
let sequencePlaying = false;
let canClick = false;
let sequence = [];
let playerSequence = [];
let blueAudio = new Audio("audio/blu.mp3");
let redAudio = new Audio("audio/rd.mp3");
let greenAudio = new Audio("audio/grn.mp3");
let yellowAudio = new Audio("audio/ylw.mp3");
let loseAudio = new Audio("audio/lose.mp3");
let lamp = {
    red: {
        isLit: false,
    },
    blue: {
        isLit: false,
    },
    green: {
        isLit: false,
    },
    yellow: {
        isLit: false,
    },
}

updateView();
function updateView() {
    app.innerHTML = /*HTML*/ `
    <div class="header">Simon says!</div>
        <div class="container">
            <div>
                <div id="blue" 
                class="blue ${lamp.blue.isLit ? 'flashblue' : ''}"
                ${canClick && gameRunning && !sequencePlaying ? 'onclick="clickColor(\'blue\')"' : ''}>
                </div>
                <div id="red" 
                class="red ${lamp.red.isLit ? 'flashred' : ''}"
                ${canClick && gameRunning && !sequencePlaying ? 'onclick="clickColor(\'red\')"' : ''}>
                </div>
            </div>
            <div>
                <div id="green" class="green ${lamp.green.isLit ? 'flashgreen' : ''}"
                ${canClick && gameRunning && !sequencePlaying? 'onclick="clickColor(\'green\')"' : ''}>
                </div>
                <div id="yellow" class="yellow ${lamp.yellow.isLit ? 'flashyellow' : ''}"
                ${canClick && gameRunning && !sequencePlaying ? 'onclick="clickColor(\'yellow\')"' : ''}>
                </div>
            </div>
        </div>
        <div class="score">Score: ${score}</div>
        <div class="score">Highscore: ${highscore}</div>
        
        ${gameRunning ? '' :  '<button onclick="startGame()">New game</button>'}
    `;
}

function startGame(){
    gameRunning = true;
    sequence = [0,];
    addNextStep();
    playerSequence = [];
    lamp.blue.isLit = false;
    lamp.red.isLit = false;
    lamp.green.isLit = false;
    lamp.yellow.isLit = false;
    playSequence();
}

function addNextStep(){
    let randomColor = Math.floor(Math.random() * 4);
    sequence.push(randomColor);
}

function playSequence() {
    let index = 0;

    function nextStep() {
        if (index < sequence.length) {
            let color = sequence[index];
            sequencePlaying = true;
            updateView();
            setTimeout(() => {

                if (color == 0) {
                    lamp.blue.isLit = true;
                    blueAudio.play();
                    
                } else if (color == 1) {
                    lamp.red.isLit = true;
                    redAudio.play();
                } else if (color == 2) {
                    lamp.green.isLit = true;
                    greenAudio.play();
                } else if (color == 3) {
                    lamp.yellow.isLit = true;
                    yellowAudio.play();
                }
                playerSequence.push(color);
                updateView();
                setTimeout(() => {
                    lamp.blue.isLit = false;
                    lamp.red.isLit = false;
                    lamp.green.isLit = false;
                    lamp.yellow.isLit = false;
                    updateView();
                    index++;
                    nextStep();
                }, 750);
            }, 100);
        }else{
            sequencePlaying = false;
            canClick = true;
            updateView();
        }
    }
    
    nextStep();
}

function clickColor(color) {
    if (canClick) {
        if (color === 'blue' && playerSequence[0] === 0){
            canClick = false;
            lamp.blue.isLit = true;
            blueAudio.play();
            playerSequence.shift();
            setTimeout(() => {
                lamp.blue.isLit = false;
                if(playerSequence.length > 0){
                    canClick = true;
                }
                updateView();
            }, 200);
        } 
        else if (color === 'red' && playerSequence[0] === 1){
            canClick = false;
            lamp.red.isLit = true;
            redAudio.play();
            playerSequence.shift();
            setTimeout(() => {
                lamp.red.isLit = false;
                if(playerSequence.length > 0){
                    canClick = true;
                }
                updateView();
            }, 200);
        }
        else if (color === 'green' && playerSequence[0] === 2){
            canClick = false;
            lamp.green.isLit = true;
            greenAudio.play();
            playerSequence.shift();
            setTimeout(() => {
                lamp.green.isLit = false;
                if(playerSequence.length > 0){
                    canClick = true;
                }
                updateView();
            }, 200);
        }
        else if (color === 'yellow' && playerSequence[0] === 3){
            canClick = false;
            lamp.yellow.isLit = true;
            yellowAudio.play();
            playerSequence.shift();
            setTimeout(() => {
                lamp.yellow.isLit = false;
                if(playerSequence.length > 0){
                    canClick = true;
                }
                updateView();
            }, 200);
        }
        else{
            gameRunning = false;
            loseAudio.play();
            score = 0;
        }
        
        
        if (playerSequence.length == 0) {
            canClick = false;
            score++;
            if(score >= highscore){
                highscore = score;
            }
            addNextStep();
            setTimeout(() => {
                playSequence();
            }, 1000);
        }
    }
    updateView();
}