const viewBox = document.getElementById("questions-view");
const modalBox = document.getElementById("questions-dialog");
const submitBtn = document.getElementById("createEditButton");

let quizData = [
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

let editingIndex = null;

function hideBox(el) {
  el.style.display = "none";
}

function showBox(el) {
  el.style.display = "block";
}

function storeData() {
  localStorage.setItem("questions", JSON.stringify(quizData));
}

function readData() {
  const saved = JSON.parse(localStorage.getItem("questions"));
  if (saved) quizData = saved;
}

function drawQuestions() {
  let container = document.getElementById("questions-container");
  container.remove();

  container = document.createElement("div");
  container.id = "questions-container";
  viewBox.appendChild(container);

  quizData.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = i;
    container.appendChild(card);

    const info = document.createElement("div");
    info.className = "question-info";
    card.appendChild(info);

    const title = document.createElement("span");
    title.className = "title";
    title.textContent = q.title;
    info.appendChild(title);

    const actions = document.createElement("div");
    actions.className = "actions";
    card.appendChild(actions);

    const editIcon = document.createElement("img");
    editIcon.src = "../../img/edit.svg";
    editIcon.onclick = onEdit;
    actions.appendChild(editIcon);

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "../../img/trash.png";
    deleteIcon.onclick = onDelete;
    actions.appendChild(deleteIcon);
  });
}

function onEdit(e) {
  editingIndex = e.target.closest(".card").dataset.index;
  const q = quizData[editingIndex];

  document.getElementById("title").value = q.title;
  document.getElementById("choiceA").value = q.choiceA;
  document.getElementById("choiceB").value = q.choiceB;
  document.getElementById("choiceC").value = q.choiceC;
  document.getElementById("choiceD").value = q.choiceD;

  submitBtn.textContent = "EDIT";
  showBox(modalBox);
}

function onDelete(e) {
  const index = e.target.closest(".card").dataset.index;
  quizData.splice(index, 1);
  storeData();
  drawQuestions();
}

function onAddQuestion() {
  editingIndex = null;
  submitBtn.textContent = "CREATE";
  showBox(modalBox);
}

function onCancel() {
  hideBox(modalBox);
}

function onCreate() {
  const obj = {
    title: document.getElementById("title").value,
    choiceA: document.getElementById("choiceA").value,
    choiceB: document.getElementById("choiceB").value,
    choiceC: document.getElementById("choiceC").value,
    choiceD: document.getElementById("choiceD").value,
    correct: "A",
  };

  if (editingIndex !== null) {
    quizData[editingIndex] = obj;
  } else {
    quizData.push(obj);
  }

  editingIndex = null;
  hideBox(modalBox);
  storeData();
  drawQuestions();
}

readData();
drawQuestions();
