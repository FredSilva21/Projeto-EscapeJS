import * as user from "../../models/user.js";

const modal = document.querySelector("#modal");
const modalContent = document.querySelector(".modal-content");
const loggedUser = user.inSession();

// Get h3 elements
const name = document.getElementById("name");
const email = document.getElementById("email");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const levels = document.getElementById("levels");
const score = document.getElementById("score");
const avatar = document.getElementById("avatar");

// Call user init
user.init();
injectProfile(name, email, age, gender, levels, score, avatar);

// If user is found in session storage, inject the profile information
function injectProfile(nameElem, emailElem, ageElem, genderElem, levelsElem, scoreElem, avatarElem) {
  if (loggedUser) {
    const userProfile = user.userAuth();
    nameElem.innerHTML = "Name: " + userProfile.name;
    emailElem.innerHTML = "Email: " + userProfile.email;
    ageElem.innerHTML = "Age: " + userProfile.dateOfBirth;
    genderElem.innerHTML = "Gender: " + userProfile.gender;
    levelsElem.innerHTML = "Levels: " + userProfile.rooms.length;
    scoreElem.innerHTML = "Score: " + userProfile.score;
    avatarElem.src=userProfile.avatar
  }
}

function verifyAdmin(){
  if(user.userAuth().type=="user"){
    admin.style.display="none"
  }
  admin.style.display="relative"
}

//Button to edit profile
const editProfile=document.querySelector(".editProfile")
editProfile.addEventListener("click",function(){
    modalContent.innerHTML=`<span class="close">&times;</span>
    <form method="get">
    <div class="form-input">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Name"
        value="${user.userAuth().name}"
        required
      />
    </div>

    <div class="form-input">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value="${user.userAuth().email}"
        required
        />
    </div>
    <div class="form-input">
      <input
        type="date"
        name="dateOfBirth"
        id="dateOfBirth"
        placeholder="Date of Birth"
        required
      />
    </div>

    <div class="form-input">
      <select name="gender" id="gender" >
        <option value="#" disabled selected>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="form-input">
      <input
        type="file"
        name="profilePhoto"
        id="profilePhoto"
        placeholder="Choose File"
        accept=".jpg, .png"
        required
      />
    </div>
    <div class="form-input">
          <button type="submit">Save</button>
    </div>
  </form>`
    modal.style.display="flex"

    const close=document.querySelector(".modal-content span")
    close.addEventListener("click", () => modal.style.display = "none");

    const save = document.querySelector(".form-input button");
    save.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission and page refresh
      const newName = document.getElementById("username").value;
      const newEmail = document.getElementById("email").value;
      const newAge = document.getElementById("dateOfBirth").value;
      const newGender = document.getElementById("gender").value;
      const newPhoto = document.getElementById("profilePhoto").value;

      let account = user.userDoc.find((username) => username.id === user.userAuth().id);

      if (account) {
        account.name = newName;
        account.email = newEmail;
        account.dateOfBirth = user.getAge(newAge);
        account.gender = newGender;
        account.avatar=newPhoto
      }
      localStorage.setItem("userDoc", JSON.stringify(user.userDoc));
      sessionStorage.setItem("userInSession", JSON.stringify(account));
      injectProfile();
    });
})

//Button Admin
const admin=document.querySelector(".adminButton")
admin.addEventListener("click",function(){
    
})