import * as Room from "../../models/room.js";
import * as Question from "../../models/question.js";
import * as User from "../../models/user.js";

Room.init();
Question.init();
User.init()
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

const loggedUser = User.userAuth()

// Set the innerHTML of the title element
const title = document.querySelector("h3");
title.innerHTML = `Level ${levelId}-${level.name}`;

let currentQuestionIndex = 0;

function renderLevel() {
  const questionImage=document.querySelector(".question-image")
  const questionTitle = document.querySelector(".question-title");
  const questionOptions = document.querySelector(".question-options");

  const questions = level.questions;

  let correctAnswers=0

  // Check if there are more questions to display
  if (currentQuestionIndex < questions.length) {
    // Get the current question
    const currentQuestion = questions[currentQuestionIndex];

    questionImage.innerHTML= `<img src="${currentQuestion.image}">`

    // Set the question title
    questionTitle.innerHTML = `<p>${currentQuestion.name}</p>`;

    // Clear previous question options
    questionOptions.innerHTML = "";

    // Loop through the options and add them to the questionOptions element
    currentQuestion.options.forEach(option => {
      const button = document.createElement("button");
      button.classList.add("option-button");
      button.textContent = option;
      questionOptions.appendChild(button);
    });

    const buttonOptions=document.querySelectorAll(".option-button")
    buttonOptions.forEach(button => {
        button.addEventListener("click",function(){
          if(button.textContent===currentQuestion.solution){
            //Increment the correct answers   
            User.updateScore()
            // Increment the question index for the next iteration
            currentQuestionIndex++;
          }else{
            currentQuestionIndex++
          }
        })
    });

  }
  // Save the updated user object back to session storage
  sessionStorage.setItem("userInSession", JSON.stringify(loggedUser));
}


renderLevel();
