const startBtn = document.getElementById("start");
const quizBox = document.getElementById("quiz");
const questionText = document.getElementById("question");

const optionA = document.getElementById("A");
const optionB = document.getElementById("B");
const optionC = document.getElementById("C");
const optionD = document.getElementById("D");

const resultBox = document.getElementById("score");
const resultText = document.getElementById("score_p");
const resultImg = document.getElementById("score_img");

const bar = document.getElementById("progress");

let quizList = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];

let point = 0;
let step = 0;

function fetchQuestions() {
  const saved = JSON.parse(localStorage.getItem("questions"));
  if (saved) quizList = saved;
}

function hideEl(el) {
  el.style.display = "none";
}

function showEl(el) {
  el.style.display = "block";
}

function drawQuestion() {
  const q = quizList[step];
  questionText.textContent = q.title;
  optionA.textContent = q.choiceA;
  optionB.textContent = q.choiceB;
  optionC.textContent = q.choiceC;
  optionD.textContent = q.choiceD;
}

function updateStep(index) {
  step = index;
  const percent = (100 * (step + 1)) / quizList.length;
  bar.style.width = percent + "%";
}

startBtn.addEventListener("click", () => {
  hideEl(startBtn);
  showEl(quizBox);
  fetchQuestions();
  point = 0;
  updateStep(0);
  drawQuestion();
});

function checkAnswer(selected) {
  const q = quizList[step];
  if (selected === q.correct) {
    point++;
  }

  if (step < quizList.length - 1) {
    updateStep(step + 1);
    drawQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  hideEl(quizBox);
  showEl(resultBox);

  const percent = Math.round((100 * point) / quizList.length);

  let text = "";
  let imgPath = "../../img/";

  if (percent <= 20) {
    text = "HUMM !";
    imgPath += "20.png";
  } else if (percent <= 40) {
    text = "YOU CAN IMPROVE !";
    imgPath += "40.png";
  } else if (percent <= 60) {
    text = "NOT BAD BUT... !";
    imgPath += "60.png";
  } else if (percent <= 80) {
    text = "GOOD !";
    imgPath += "80.png";
  } else {
    text = "CRAZY AMAZING !";
    imgPath += "100.png";
  }

  resultText.textContent = text + " : " + percent + " %";
  resultImg.src = imgPath;
}
