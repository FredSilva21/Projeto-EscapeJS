// Class of User Model
export class User {
  constructor(id, name, email, dateOfBirth, gender, password) {
    this.id = 1;
    this.name = name;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.password = password;
  }
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
          dateOfBirth: "01-01-2000",
          gender: "Other",
          password: "admin123",
        },
      ];
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

// Calculate the Age
export function calculateAge(dateOfBirth) {
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

// Login
export function login(name, password) {
  let username = userDoc.find(
    (username) => username.name === name && username.password === password
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

// Check if there's and user which is already logged in.
export function inSession() {
  return sessionStorage.userInSession ? true : false;
}

// Return the user that's authenticated
export function userAuth() {
  return JSON.parse(sessionStorage.userInSession);
}
