// ------------------------------------ //
// ------------ VARIBALES ------------  //
// ------------------------------------ //
var timerNum = $("#timer-num");
var currentTime;
var myInterval;
var timeRunning = false;
var time = 20;

var startBtn = $("#start");
var stopBtn = $("#stop");

// ----------------------------------- //
// --------- TIMER FUNCTIONS --------  //
// ----------------------------------- //

function count() {
  currentTime = time--;
  timerNum.text(currentTime);
}

function start() {
  if (!timeRunning) {
    myInterval = setInterval(count, 1000);
    timeRunning = true;
  }
}

function stop() {
  clearInterval(myInterval);
}

// ---------------------------------- //
// ------------- BUTTONS -----------  //
// ---------------------------------- //
startBtn.on("click", function() {
  start();
});
