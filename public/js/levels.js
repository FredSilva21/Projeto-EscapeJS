import * as Room from "../../models/room.js";
import * as Question from "../../models/question.js";
import * as User from "../../models/user.js";
import * as Time from "../../utils/timer.js"

Room.init();
Question.init();
User.init();

//Get score in local storage
const score=localStorage.getItem("Score")

//Get variable in url
const urlParams = new URLSearchParams(window.location.search);
const levelId = urlParams.get("levelId");
const roomId=urlParams.get("roomId")

//Find what level is
let level;
const room = Room.roomDoc.find((room) => room.id == roomId);
if (room) {
  level = room.levels.find((level) => level.id == levelId);
}

let loggedUser = User.userAuth();
const questions = level.questions;

// Set the innerHTML of the title element
const title = document.querySelector("h3");
title.innerHTML = `${level.name}`;

//Modal
const modal=document.getElementById("modal")
const modalBody=document.querySelector(".modal-body")
const h2=document.querySelector(".modal-content h2")

// Increment variables
let currentQuestionIndex = 0;
let correctAnswers=0

function checkAnswer(selectedOption, currentQuestion, loggedUser) {
  const optionButtons = document.querySelectorAll(".option-button");
  if (selectedOption === currentQuestion.options[currentQuestion.solution]) {
    updateScore(loggedUser);
    correctAnswers++;

    const correctButton = optionButtons[currentQuestion.solution];
    correctButton.classList.add("correct-option"); // Adiciona a classe CSS para destacar a opção correta
    correctButton.style.backgroundColor = "green";
    correctButton.style.color="white"
  } else {
    Time.wrongAnswerTime();
    optionButtons.forEach((button) => {
      if (button.textContent === selectedOption) {
        button.classList.add("incorrect-option"); // Adiciona a classe CSS para destacar a opção incorreta
        button.style.backgroundColor = "red";
        button.style.color="white"
      }
    });
  }

  setTimeout(() => {
    optionButtons.forEach((button) => {
      button.classList.remove("incorrect-option"); // Remove a classe CSS para restaurar a cor original do botão
    });

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        requestAnimationFrame(() => renderLevel()); // Força uma nova renderização do DOM antes de prosseguir para a próxima pergunta
      } else if (currentQuestionIndex === questions.length) {
        modal.style.display = "flex"
        h2.innerHTML = `Level ${levelId} Finished!`;
        modalBody.innerHTML = `
          <div><p>You answered ${correctAnswers} questions correctly of ${questions.length}!</p></div>
          <div><p>Score: +${score * correctAnswers}</p></div>
          <div><a href="./room.html?roomId=${roomId}">Back to Room</a></div>
        `;

        updateQuestions(loggedUser, correctAnswers);
      }
    }, 500); // Atraso adicional de 1 segundo antes de prosseguir para a próxima pergunta

  }, 1000);
}




//Function to render Level
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

  // Change loop to create buttons
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("option-button");
    button.classList.add("col-sm-6");
    button.textContent = option;
    questionOptions.appendChild(button);

    // Add event click
    button.addEventListener("click", function () {
      checkAnswer(option, currentQuestion, loggedUser);
    });
  });
}

//Function to update user score
function updateScore(loggedUser) {
  const userIndex = User.userDoc.findIndex((item) => item.id === loggedUser.id);
  if (userIndex !== -1) {
    User.userDoc[userIndex].score += 25;
    localStorage.setItem("userDoc", JSON.stringify(User.userDoc));
    sessionStorage.setItem("userInSession", JSON.stringify(User.userDoc[userIndex]));
  }
}

//Function to add the correct questions to user questions
function updateQuestions(loggedUser,correctAnswers){
  const userIndex = User.userDoc.findIndex((item) => item.id === loggedUser.id);
  if (userIndex !== -1) {
    User.userDoc[userIndex].questions[levelId-1]=correctAnswers
    localStorage.setItem("userDoc", JSON.stringify(User.userDoc));
    sessionStorage.setItem("userInSession", JSON.stringify(User.userDoc[userIndex]));
  }
}

renderLevel();