// ------------------------------------------ //
// --------------- VARIBALES ---------------  //
// ------------------------------------------ //
var timerNum = $("#timer-num");
var currentTime = 5;
var myInterval;
var timeRunning = false;

var questionBox = $(".question-box");

var startBtn = $("#start");

// ------------------------------------------ //
// ------------- QUESTION DATA -------------  //
// ------------------------------------------ //

var questions = [
  (q1 = {
    question: "What is Erin's first name?",
    answers: ["Aaron", "Kate", "Kelly", "Julie"]
  }),
  (q2 = {
    question: "What restaurant chain was Pam banned from?",
    answers: ["TGIFriday's", "Chili's", "O'Charley's", "Applebee's"]
  }),
  (q3 = {
    question: "What is Michael Scott's middle name?",
    answers: ["Paul", "James", "Steven", "Gary"]
  }),
  (q4 = {
    question: "What is the URL to Creed's infamous 'blog'?",
    answers: [
      "www.creedthoughts.com/creed",
      "www.creedthoughts.gov.www/creedthoughts",
      "www.creedthoughts.org/creedblog",
      "www.creedthoughts.io/mindofcreed"
    ]
  })
];

// ----------------------------------------- //
// ------------ TIMER FUNCTIONS -----------  //
// ----------------------------------------- //

function count() {
  if (currentTime > 0) {
    currentTime--;
    timerNum.text(currentTime);
  } else if (currentTime === 0) {
    alert("Time is up");
    clearInterval(myInterval);
  }
}

function start() {
  myInterval = setInterval(count, 1000);
  timeRunning = true;
}

// ----------------------------------------- //
// ---------- QUESTION FUNCTIONS ----------  //
// ----------------------------------------- //
function showQuestions() {
  for (var i = 0; i < questions.length; i++) {
    // Create h3 and display question
    var newQuestion = $("<h3>");
    newQuestion.text(questions[i].question);

    // Create ul before filling it with lis
    var newAnswerSet = $("<ul>");

    // Display new question to DOM
    questionBox.append(newQuestion);

    // Loop through quetion object and create li for each answer
    for (var j = 0; j < questions[i].answers.length; j++) {
      // Create li
      newLi = $("<li>");

      // Add answer to li
      newLi.text(questions[i].answers[j]);

      // Send to newAnswerSet
      newAnswerSet.append(newLi);

      // Display ul with lis
      questionBox.append(newAnswerSet);
    }
  }
}

// ------------------------------------------ //
// ----------------- BUTTONS ---------------  //
// ------------------------------------------ //

startBtn.on("click", function() {
  if (!timeRunning) {
    start();
    showQuestions();
  }
});
