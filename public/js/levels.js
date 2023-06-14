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

let currentQuestionIndex = 0;
let correctAnswers=0

// Adicione esta função fora da função renderLevel()
function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === currentQuestion.solution) {
    correctAnswers++;
    console.log("Correct");
  }

  currentQuestionIndex++;
  renderLevel();
}

function renderLevel() {
  const questionImage = document.querySelector(".question-image");
  const questionTitle = document.querySelector(".question-title");
  const questionOptions = document.querySelector(".question-options");

  // Check if there are more questions to display
  if (currentQuestionIndex < questions.length) {
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
      button.textContent = option;
      questionOptions.appendChild(button);

      // Adicione o evento de clique ao botão
      button.addEventListener("click", function () {
        checkAnswer(option);
      });
    });
  }
  // Save the updated user object back to session storage
  sessionStorage.setItem("userInSession", JSON.stringify(loggedUser));
}

renderLevel();
