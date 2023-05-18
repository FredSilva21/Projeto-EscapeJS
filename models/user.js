export class User {
  constructor(name, email, age, gender, password, password_confirmation) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.gender = gender;
    this.password = password;
    this.password_confirmation = password_confirmation;
  }
}

// Admin ROOT Account
/*
export function init() {
  userDoc.push();
}
*/

// Add new User
export function createUser(
  name,
  email,
  age,
  gender,
  password,
  password_confirmation
) {
  userDoc.push(
    new User(
      generateId(),
      name,
      email,
      age,
      gender,
      password,
      password_confirmation
    )
  );
  localStorage.userDoc = JSON.stringify(userDoc);
}
