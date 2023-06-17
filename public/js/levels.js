import * as Room from "../../models/room.js";
import * as Question from "../../models/question.js";
import * as User from "../../models/user.js";

Room.init();
Question.init();
User.init();
//Get variable in url
const urlParams = new URLSearchParams(window.location.search);
const levelId = urlParams.get("levelId");

let level;
for (const room of Room.roomDoc) {
  level = room.levels.find((level) => level.id == levelId);
  if (level) {
    break;
  }
}

const loggedUser = User.userAuth();
const questions = level.questions;

// Set the innerHTML of the title element
const title = document.querySelector("h3");
title.innerHTML = `Level ${levelId}-${level.name}`;

// ...

// Defina currentQuestionIndex antes das funções
let currentQuestionIndex = 0;

function checkAnswer(selectedOption, currentQuestion, loggedUser) {
  if (selectedOption === currentQuestion.solution) {
    updateScore(loggedUser);
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderLevel();
  }
}

function renderLevel() {
  const questionImage = document.querySelector(".question-image");
  const questionTitle = document.querySelector(".question-title");
  const questionOptions = document.querySelector(".question-options");

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];

  questionImage.innerHTML = `<img src="${currentQuestion.image}">`;

  // Set the question title
  questionTitle.innerHTML = `<p>${currentQuestion.name}</p>`;

  // Clear previous question options
  questionOptions.innerHTML = "";

  // Modifique o loop que cria os botões de opção
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("option-button");
    button.classList.add("col-sm-6");
    button.textContent = option;
    questionOptions.appendChild(button);

    // Adicione o evento de clique ao botão
    button.addEventListener("click", function () {
      checkAnswer(option, currentQuestion, loggedUser);
    });
  });
}

function updateScore(loggedUser) {
  const userIndex = User.userDoc.findIndex((item) => item === loggedUser);
  if (userIndex !== -1) {
    User.userDoc[userIndex].score += 25;
    localStorage.setItem("userDoc", JSON.stringify(User.userDoc))
    sessionStorage.setItem("userInSession", JSON.stringify(loggedUser));
  }
}

renderLevel();
