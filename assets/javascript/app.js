// ------------------------------------------ //
// --------------- VARIBALES ---------------  //
// ------------------------------------------ //
var timerNum = $("#timer-num");
var timerLabel = $("#timer-label");
var currentTime = 16;
var myInterval;
var timeRunning = false;
var correct = $("#correct");
var correctCount = 0;
var wrong = $("#wrong");
var wrongCount = 0;

var questionBox = $(".question-box");

var startBtn = $("#start");
var retryBtn = $("#restart");

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
  }),
  (q5 = {
    question: "What name did Pam and Angela fight over for their babies?",
    answers: ["Andrew", "James", "Phillip", "William"]
  }),
  (q6 = {
    question: "Which of Angela's cats does Dwight freeze?",
    answers: ["Bandit", "Sprinkles", "Sparkles", "Fluffy"]
  }),
  (q7 = {
    question:
      "At the infamous dinner party, what dish took over 3 hours to make?",
    answers: ["Chili", "Tikka Masala", "Pork Roast", "Ossobuco"]
  }),
  (q8 = {
    question: "Who started the fire?",
    answers: ["Kevin", "Ryan", "Oscar", "Creed"]
  })
];

var correctAnswers = [
  "Kelly",
  "Chili's",
  "Gary",
  "www.creedthoughts.gov.www/creedthoughts",
  "Phillip",
  "Sprinkles",
  "Ossobuco",
  "Ryan"
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
    clearInterval(myInterval);
    // Disable li clicks
    $(document).off("click", "li");
    // Set clock to not running
    timeRunning = false;
  }
}

function start() {
  myInterval = setInterval(count, 1000);
  timeRunning = true;
}

function restart() {
  // Remove all ul and li elements from the DOM
  questionBox.empty();
  // Clear the running interval
  clearInterval(myInterval);
  // Reset DOM time h3 and span
  timerNum.text(0);
  // Set clock to not running
  timeRunning = false;
  // Reset currentTime
  currentTime = 16;
}

// ----------------------------------------- //
// ---------- QUESTION FUNCTIONS ----------  //
// ----------------------------------------- //
function randomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function showQuestions() {
  var usedIntervals = [];
  for (var i = 0; i < 4; i++) {
    var randInd = randomIndex(questions);

    if (!usedIntervals.includes(randInd)) {
      usedIntervals.push(randInd);
      // Create h3 and display question
      var newQuestion = $("<h3>");
      newQuestion.text(questions[randInd].question);

      // Create ul before filling it with lis
      var newAnswerSet = $("<ul>");

      // Display new question to DOM
      questionBox.append(newQuestion);

      // Loop through quetion object and create li for each answer
      for (var j = 0; j < questions[randInd].answers.length; j++) {
        // Create li
        newLi = $("<li>");

        // Add answer to li
        newLi.text(questions[randInd].answers[j]);

        // Send to newAnswerSet
        newAnswerSet.append(newLi);

        // Display ul with lis
        questionBox.append(newAnswerSet);
      }
    } else {
      var newQuestion = $("<h3>");
      newQuestion.text("FAILED LOOP, RECEIVED TOO MANY OF THE SAME INDEX");
      questionBox.append(newQuestion);
    }
  }
}

function removeElement(arr, el) {
  var index = arr.indexOf(el);
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

retryBtn.on("click", restart);

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
