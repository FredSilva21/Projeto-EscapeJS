// Class of User Model
export class User {
  id = 0;
  name = "";
  email = "";
  dateOfBirth = "";
  gender = "";
  password = "";
  type = "";
  avatar = "";
  questions = [];
  rooms = [];
  score = 0;

  constructor(id, name, email, dateOfBirth, gender, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.password = password;
    this.type = "user";
    this.avatar = "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
    this.questions = [];
    this.rooms = [];
    this.score = 0;
  }

  // Methods
  addRoom(room) {
    this.rooms.push(room);
  }

  deleteRoom(room) {
    this.rooms.pop(room);
  }

  addQuestion(questions) {
    this.questions.push(questions);
  }

  deleteQuestion(question) {
    this.questions.pop(question);
  }

  changePassword(password) {
    this.oldPassword = password;
  }

  updateScore(numero){
    this.score+=25*numero
    console.log("TESTE")
  }

  calculateScore(score) {}
}

// Load users info from local storage
export let userDoc;

// Load Admin ROOT Account
export function init() {
  userDoc = localStorage.userDoc
    ? JSON.parse(localStorage.userDoc)
    : [
        {
          id: 1,
          name: "admin",
          email: "admin@email.com",
          dateOfBirth: getAge("01-01-2000"),
          gender: "Other",
          password: "admin123",
          type: "admin",
          avatar: "../public/images/user.png",
          questions: [],
          rooms: [],
          score: 10000,
        },
      ];

  localStorage.setItem("userDoc",JSON.stringify(userDoc))
}




// Generate next ID
export function generateId(id) {
  id = userDoc.length + 1;
  return id;
}

// Add new User
export function createUser(id, name, email, age, gender, password) {
  userDoc.push(new User(generateId(id), name, email, age, gender, password));
  localStorage.userDoc = JSON.stringify(userDoc);
}

// Login
export function login(email, password) {
  let username = userDoc.find(
    (username) => username.email === email && username.password === password
  );
  if (username) {
    sessionStorage.userInSession = JSON.stringify(username);
    return true;
  }
  return false;
}

// Logout
export function logout() {
  sessionStorage.removeItem("userInSession");
}

export function deleteUser(name) {
  const position = userDoc.findIndex((user) => user.name === name);
  if (position !== -1) {
    userDoc.splice(position, 1);
    localStorage.userDoc = JSON.stringify(userDoc);
  } else {
    return new Error(`${name}: is not present in the database`);
  }
}

// Calculate the Age
export function getAge(dateOfBirth) {
  const currentDate = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();
  const currentDay = currentDate.getDate();
  const birthDay = birthDate.getDate();

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }

  return age;
}

// Check if there's and user which is already logged in.
export function inSession() {
  return sessionStorage.userInSession ? true : false;
}

// Return the user that's authenticated
export function userAuth() {
  return JSON.parse(sessionStorage.userInSession);
}

export function exportAllUsers() {
  return userDoc;
}