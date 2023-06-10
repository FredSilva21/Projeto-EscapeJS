import { generateId } from "./user.js";
export class question {
  id = "";
  name = "";
  image="";
  options = [];
  solution = 0;
  solved = 0;

  constructor(id, name, options, solution, solved=0, creator_id) {
    this.id = id;
    this.name = name;
    this.options = options;
    this.solution = solution;
    this.solved = solved;
    this.creator_id = creator_id;
  }
}


export let questionsDoc

//Inject in questionsDoc
export function init(){
  questionsDoc=localStorage.questionsDoc
  ? JSON.parse(localStorage.roomDoc)
  : [
    {
      id: 1,
      name:"True or False?There's a difference between this operators?",
      image:"../public/images/level1-question1.png",
      options:["True","False"],
      solution:"True",
      solved:0
    },
    {
      id: 2,
      name:"What's the return",
      image:"../public/images/level1-question1.png",
      options:["True","False"],
      solution:"True",
      solved:0
    }
    ];

  localStorage.setItem("questionsDoc", JSON.stringify(questionsDoc));
}

export function addQuestion(name,image,options,solution){
  if (questionsDocDoc.some((question) => question.photo===photo)) {
    throw Error(`Question ${name} already exists!`);
  } else {
    roomDoc.push(new Room(generateId(id), name, image, options,solution));
    localStorage.questionDoc = JSON.stringify(questionsDocDoc);
  }
}