//	Lab	Operating System : Windows 11
//Browser version: google chrome : Version 110.0.5481.178 (Official Build) (64-bit)

//get varibles for all elements might need to use
const light = document.querySelector('.light');
const start = document.querySelector('#middle');
const flash = document.querySelectorAll(".flash");
const rightPane = document.querySelector('#right');
const leftPane = document.querySelector('#left');
const green = document.querySelector(".green");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const blue = document.querySelector(".blue");



let gameStatus = "stopped"; // currently game status
let sequence = [];// generate random sequence of the light
let index = 0;// current button that I need click
let intervalId = null;  // 4 button flash interval timer
let intervalEnd = null;// set end timer 5 times
let timeSpeed = 1000; // it's the speed of flash
let round = 0; //which round



//click start to start the game
start.addEventListener('click', function () { //when user click start

    if(gameStatus == "stopped"){ // the status is stopped
        light.style.backgroundColor = '#00FF00'; //change the red light to green
        gameStatus = "started"; // change status to started
        setTimeout(  () =>  {
            startGame(); // start game function
        }, 2000) // 3S later start the game + 1S gap time = 3S start the game

    }else{
        showEnd(); //flash 5 times 4 button
        resetGame(); //reset data for next game
    }
});

function startGame(){
    sequence.length=0; //make the sequence empty
    generateNum(); // generrate number for flash
}

function generateNum(){
    if(gameStatus = "started"){
        let ramNum =  Math. trunc(Math.random()*4); //generate one number 0-3
        if(sequence.length < 10){ //change 1 to 01 to show
            rightPane.innerText = '0'+ (sequence.length).toString(); //1-》01
        }else{
            rightPane.innerText = (sequence.length).toString(); // 10 still 10
        }
        let leftNum = parseInt(leftPane.innerText,10);  //remember the biggest score  you win
        if(leftNum < sequence.length){   // got bigger oen score
            leftNum = sequence.length; // change lef panel
        }
        if(leftNum < 10){
            leftPane.innerText = '0'+ leftNum.toString();//1-》01
        }else{
            leftPane.innerText = leftNum.toString();// 10 still 10
        }

        sequence.push(ramNum); //new number add to the flash light sequence
        round = sequence.length; // what is the current round of the game?
        if(round === 1){

        }
        if(round === 5 || round === 9 || round === 13){ // when the round 5. 9 . 13
            timeSpeed -=200; // speed change quicker -200
            console.log(timeSpeed);  //test
        }
        console.log(sequence);  //test
        showSequence(); //start flash 4 lights
    }else{
        showEnd();
    }

}

function showSequence() {
    let i= 0; //set a limit for flash times
    intervalId = setInterval(() => {  // set interval to run flashBtn();
        if(i < sequence.length) { //if is true continue flash
            flashBtn(sequence[i]);  //flash 1 light
            i++; //equal -1 time
        }else{
            clearInterval(intervalId); //stop flash
            intervalId = null;  //clean the timer
            index = 0;  //reset index for the next sequence
            startTimer(); //start check 5S will be end
        }
    }, timeSpeed); //timeSpeed run flashBtn();
}

function flashBtn(buttonIndex) {
    if (buttonIndex === 0) { //0 is green because flash[0] is green
        flashGreen();
    }
    if (buttonIndex === 1) { //1 is red
        flashRed();
    }
    if (buttonIndex === 2) {//2 is yellow
        flashYellow();
    }
    if (buttonIndex === 3) { //3 is blue
        flashBlue();
    }
    setTimeout(() => {
        flash[buttonIndex].style.backgroundColor = ""; //reset to default background clolor
    }, 300);
}

function flashGreen() {
    green.style.backgroundColor = 'hsl(100, 100%, 50%)'; // change background color
}
function flashRed() {
    red.style.backgroundColor = 'hsl(0, 100%, 50%)';// change background color
}
function flashYellow() {
    yellow.style.backgroundColor = 'hsl(60, 100%, 50%)';// change background color
}
function flashBlue() {
    blue.style.backgroundColor = 'hsl(240, 100%, 50%)';// change background color

}

function startTimer() {
    intervalId = setTimeout(() => {
        showEnd();
    }, 5000); //5s later no lick end game
}
function resetGame() {
    sequence.length = 0; //reset sequence
    index = 0; //reset index
    clearInterval(intervalId);
    intervalId = null;
    rightPane.innerText= '00'; //reset right panel
}

flash.forEach((button, num) => {
    button.addEventListener('click', () => {
        if(gameStatus == "started"){
            if (intervalId) {
                clearTimeout(intervalId); //stop flash button
                intervalId = null;//stop flash button because start check now
            }
           // let num  = Array.prototype.indexOf.call(flash, button);
            //get index of the element in flash object array
            setTimeout(() => {
                flash[num].style.backgroundColor = ""; //reset defaut settings after 0.3 s
            }, 300);
            if (num === sequence[index]) { //if it's same
                index++; //prepare check next one
                if (index === sequence.length) { //checked last one and successful
                    setTimeout(generateNum, 1000); // 1s later start new turn

                } else {
                    startTimer(); //waiting for next one click
                }
            } else {
                gameStatus = "stopped"; //change states
                showEnd(); //reset and end game

            }
        }

    });
});



function showEnd() { //5 times flash for ending show
    resetGame(); //reset

    gameStatus = "stopped"; //change states
    let i = 0; //form 0 start to 5
    intervalEnd = setInterval(() =>{
        if(i < 5){
            flashBtn(0); //all light
            flashBtn(1);
            flashBtn(2);
            flashBtn(3);
            i++;
        }else {
            clearInterval(intervalEnd); //reset
            intervalEnd = null; //reset
            sequence=[];
            light.style.backgroundColor = '#ff0000'; //last change light red


        }
    },500) //every 0.5s flash one time
}

