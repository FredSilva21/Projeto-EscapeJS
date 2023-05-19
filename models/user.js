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

// Admin ROOT Account

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

//Array UserDoc
export let userDoc = [];

//Generate Id
export function generateId(id) {
  id = userDoc.length + 1;
  return id;
}

// Add new User
export function createUser(id, name, email, age, gender, password) {
  userDoc.push(new User(generateId(id), name, email, age, gender, password));
  localStorage.userDoc = JSON.stringify(userDoc);
}

//Calculate age
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
