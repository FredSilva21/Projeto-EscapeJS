import { generateId } from "./user.js";

export class Question {
  id = "";
  name = "";
  image = "";
  options = [];
  solution = 0;
  solved = 0;

  constructor(id, name, image, options, solution, solved = 0) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.options = options;
    this.solution = solution;
    this.solved = solved;
  }
}

export let questionsDoc = [];

export function init() {
  questionsDoc = localStorage.questionsDoc
    ? JSON.parse(localStorage.questionsDoc)
    : [
        {
          id: 1,
          name: "True or False? There's a difference between these two operators?",
          image: "../public/images/level1-question1.png",
          options: ["True", "False"],
          solution: "True",
          solved: 0,
        },
        {
          id: 2,
          name: "True or False? There's a difference between these two operators?",
          image: "../public/images/level1-question1.png",
          options: ["True", "False"],
          solution: "True",
          solved: 0,
        },
        {
          id: 3,
          name: "True or False? There's a difference between these two operators?",
          image: "../public/images/level1-question1.png",
          options: ["True", "False"],
          solution: "True",
          solved: 0,
        },
      ];

  localStorage.setItem("questionsDoc", JSON.stringify(questionsDoc));
}

export function addQuestion(id, name, image, options, solution) {
  if (questionsDoc.some((question) => question.image === image)) {
    throw Error(`Question with image ${image} already exists!`);
  } else {
    questionsDoc.push(new Question(id, name, image, options, solution));
    localStorage.questionDoc = JSON.stringify(questionsDoc);
  }
}
