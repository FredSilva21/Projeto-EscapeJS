export class User {
  constructor(id,name, email, age, gender, password) {
    this.id= id
    this.name = name;
    this.email = email;
    this.age = age;
    this.gender = gender;
    this.password = password;
  }
}

// Admin ROOT Account
/*
export function init() {
  userDoc.push();
}
*/
export let userDoc=[]

export function generateId(id){
  id=userDoc.length+1
  return id
}

// Add new User
export function createUser(
  id,
  name,
  email,
  age,
  gender,
  password,
) {
  userDoc.push(
    new User(
      generateId(id),
      name,
      email,
      age,
      gender,
      password,
    )
  );
  localStorage.userDoc = JSON.stringify(userDoc);

}

export function calculateAge(dateOfBirth){
  const currentDate = new Date();
  const birthDate = new Date(dateOfBirth);
  
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  
  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();
  const currentDay = currentDate.getDate();
  const birthDay = birthDate.getDate();
  
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }
  
  return age;
}

