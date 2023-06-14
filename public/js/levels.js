import * as Room from "../../models/room.js";
import * as Question from "../../models/question.js";

Room.init();
Question.init();
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

// Set the innerHTML of the title element
const title = document.querySelector("h3");
title.innerHTML = `Level ${levelId}-${level.name}`;

function renderLevel() {
  const questionTitle = document.querySelector(".question-title");
  const questionOptions = document.querySelector(".question-options");

  // Get the level object
  const roomLevel = Room.roomDoc.find((room) =>
    room.levels.some((level) => level.id == levelId)
  );

  if (!roomLevel) {
    console.log("Level not found.");
    return;
  }

  // Get a random level from the room's levels array
  const level =
    roomLevel.levels[Math.floor(Math.random() * roomLevel.levels.length)];
  console.log(level);

  if (!level.questions || level.questions.length === 0) {
    console.log("No questions found.");
    return;
  }

  // Get a random question from the level's questions array
  const randomQuestion =
    level.questions[Math.floor(Math.random() * level.questions.length)];
  console.log(randomQuestion);

  if (!randomQuestion) {
    console.log("Question name is undefined");
    return;
  }

  // Set the question title
  questionTitle.innerHTML = randomQuestion.name;

  // Clear previous question options
  questionOptions.innerHTML = "";

  // Shuffle the options randomly
  const shuffledOptions = randomQuestion.options.sort(
    () => Math.random() - 0.5
  );

  // Loop through the options and add them to the questionOptions element
  shuffledOptions.forEach((option) => {
    questionOptions.innerHTML += `<button class="option-button" value="${option}">${option}</button>`;
  });
}

renderLevel();
