// ------------------------------------------ //
// --------------- VARIBALES ---------------  //
// ------------------------------------------ //
var timerNum = $("#timer-num");
var currentTime = 15;
var myInterval;
var timeRunning = false;
var correct = $("#correct");
var correctCount = 0;
var wrong = $("#wrong");
var wrongCount = 0;

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

var correctAnswers = [
  "Kelly",
  "Chili's",
  "Gary",
  "www.creedthoughts.gov.www/creedthoughts"
];

var alreadyGuessed = [];

// ----------------------------------------- //
// ------------ TIMER FUNCTIONS -----------  //
// ----------------------------------------- //

function count() {
  if (currentTime > 0) {
    currentTime--;
    timerNum.text(currentTime);
  } else if (currentTime === 0) {
    $("#timer-label").text("Time is up!");
    clearInterval(myInterval);
    // Disable li clicks
    $;
    $(document).off("click", "li");
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

function removeElement(arr, word) {
  var index = arr.indexOf(word);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

// ------------------------------------------ //
// ----------------- CLICKS ----------------  //
// ------------------------------------------ //

startBtn.on("click", function() {
  if (!timeRunning) {
    start();
    showQuestions();
  }
});

$(document).on("click", "li", function() {
  if (
    correctAnswers.includes($(this).text()) && // If the word is in the correctAnswers array
    !alreadyGuessed.includes($(this).text()) // If the word has not already been guessed
  ) {
    // Add to correct count
    correctCount++;
    // Push to DOM
    correct.text(correctCount);
    // Remove that element from correctAnswers to avoid multiple clicks
    removeElement(correctAnswers, $(this).text());
    // Add to alreadyGuessed array
    alreadyGuessed.push($(this).text());
  } else if (
    !correctAnswers.includes($(this).text()) && // If the word is not in the correctAnswers array
    !alreadyGuessed.includes($(this).text()) // If the word has not already been guessed
  ) {
    // Add to wrong count
    wrongCount++;
    // Push to DOM
    wrong.text(wrongCount);
    // Add to alreadyGuessed array
    alreadyGuessed.push($(this).text());
  }
});
