export class Question {
  id = "";
  name = "";
  image = "";
  options = [];
  solution = "";
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
          name: "What is the value of <b>number?</b>",
          image: "../public/images/level1-question2.png",
          options: ["2", "10","NaN","Error"],
          solution: "10",
          solved: 0,
        },
        {
          id: 3,
          name: "What is the error?",
          image: "../public/images/level1-question3.png",
          options: ["The variable 'number' is not declared correctly.","The variable 'text' is not declared correctly.","The concatenation is being performed using the addition operator (+) instead of the concatenation operator (+=).","The variable 'result' is not being printed correctly to the console."],
          solution: "The variable 'number' is not declared correctly.",
          solved: 0,
        },
        {
          id: 4,
          name: "What will be the result printed in the console when executing the code?",
          image: "../public/images/level1-question4.png",
          options:["True", "False"],
          solution: "False",
          solved: 0,
        },
        {
          id: 5,
          name: "What's the result?",
          image: "../public/images/level1-question5.png",
          options:["0", "1", "2", "3"],
          solution: "1",
          solved: 0,
        },
        {
          id: 6,
          name: "The JavaScript 'typeof' operator can be used to determine the data type of a variable.",
          image: "",
          options:["True", "False"],
          solution: "True",
          solved: 0,
        },
        //Level 2
        {
          id: 7,
          name: "What will be the output of the following code?",
          image: "../public/images/level2-question1.png",
          options:["Greater than 5","Equal to 5","Less than 5","undefined"],
          solution: "Greater than 5",
          solved: 0,
        },
        {
          id: 8,
          name: "What is the error in the following code?",
          image: "../public/images/level2-question2.png",
          options:["Missing semicolon at the end of the first line","Division by zero","Undeclared variable 'result'","Missing 'catch' block"],
          solution: "Greater than 5",
          solved: 0,
        },
        {
          id: 9,
          name: "The if-else statement allows the execution of different code blocks based on specified conditions.",
          image: "",
          options:["True", "False"],
          solution: "True",
          solved: 0,
        },
        {
          id: 10,
          name: "What will be the output of the following code?",
          image: "../public/images/level2-question4.png",
          options:["It's a hot and sunny day!","The weather is not hot and sunny."],
          solution: "The weather is not hot and sunny.",
          solved: 0,
        },
        //Level 3
        {
          id: 8,
          name: "What is the error in the following code??",
          image: "../public/images/level2-question1.png",
          options:["Missing semicolon at the end of the first line","Division by zero","Undeclared variable 'result'","Missing 'catch' block"],
          solution: "Greater than 5",
          solved: 0,
        },
        {
          id: 8,
          name: "What is the error in the following code??",
          image: "../public/images/level2-question1.png",
          options:["Missing semicolon at the end of the first line","Division by zero","Undeclared variable 'result'","Missing 'catch' block"],
          solution: "Greater than 5",
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