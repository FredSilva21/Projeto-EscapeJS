import { generateId } from "./user.js";
export class Question {
  id = "";
  name = "";
  image="";
  options = [];
  solution = 0;
  solved = 0;

  constructor(id, name, options, solution, solved=0) {
    this.id = id;
    this.name = name;
    this.options = options;
    this.solution = solution;
    this.solved = solved;
  }
}

export let questionsDoc=[]

export function init(){
  questionsDoc=localStorage.questionDoc
    ? JSON.parse(localStorage.questionDoc)
    : [
      {
        id:1,
        name:"True or False? There's a difference between this two operators?",
        image:"../public/images/level1-question1.png",
        options:["True","False"],
        solution:"True",
        solved:0
      },
      {
        id:2,
        name:"True or False? There's a difference between this two operators?",
        image:"../public/images/level1-question1.png",
        options:["True","False"],
        solution:"True",
        solved:0
      },
      {
        id:3,
        name:"True or False? There's a difference between this two operators?",
        image:"../public/images/level1-question1.png",
        options:["True","False"],
        solution:"True",
        solved:0
      }
    ]
}

export function addQuestion(name,image,options,solution){
  if (questionsDoc.some((question) => question.photo===photo)) {
    throw Error(`Question ${name} already exists!`);
  } else {
    questionsDoc.push(new Question(generateId(id), name, image, options,solution));
    localStorage.questionDoc = JSON.stringify(questionsDoc);
  }
}