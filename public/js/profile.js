import * as user from "../../models/user.js";

const admin = document.querySelector(".adminButton");
verifyAdmin()

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
injectProfile();

// If user is found in session storage, inject the profile information
function injectProfile() {
  if (loggedUser) {
    const userProfile = user.userAuth();
    name.innerHTML = "Name: " + userProfile.name;
    email.innerHTML = "Email: " + userProfile.email;
    age.innerHTML = "Age: " + userProfile.dateOfBirth;
    gender.innerHTML = "Gender: " + userProfile.gender;
    levels.innerHTML = "Levels: " + userProfile.rooms.length;
    score.innerHTML = "Score: " + userProfile.score;
    avatar.src = userProfile.avatar;
  }
}

function verifyAdmin() {
  if (user.userAuth().type == "user") {
    admin.style.display = "none";
  }
  admin.style.display = "relative";
}

//Button to edit profile
const editProfile = document.querySelector(".editProfile");
editProfile.addEventListener("click", function () {
  modalContent.innerHTML = `<span class="close">&times;</span>
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
        id="editEmail"
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
      <select name="gender" id="editGender" >
        <option value="#" disabled selected>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="form-input">
      <input
        type="text"
        name="profilePhoto"
        id="profilePhoto"
        placeholder="Image Url"
        value="${user.userAuth().avatar}"
        required
      />
    </div>
    <div class="form-input">
          <button type="submit">Save</button>
    </div>
  </form>`;
  modal.style.display = "flex";

  const close = document.querySelector(".modal-content span");
  close.addEventListener("click", () => (modal.style.display = "none"));

  const save = document.querySelector(".form-input button");
  save.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission and page refresh
    const newName = document.getElementById("username").value;
    const newEmail = document.getElementById("editEmail").value;
    const newAge = document.getElementById("dateOfBirth").value;
    const newGender = document.getElementById("editGender").value;
    const newPhoto = document.getElementById("profilePhoto").value;

    let account = user.userDoc.find(
      (username) => username.id === user.userAuth().id
    );

    if (account) {
      if (
        newName !== account.name ||
        newEmail !== account.email ||
        (newAge !== "" && user.getAge(newAge) !== account.dateOfBirth) ||
        newGender !== "#" ||
        newPhoto !== account.avatar
      ) {
        account.name = newName;
        account.email = newEmail;
        account.dateOfBirth = newAge !== "" ? newAge : account.dateOfBirth;
        account.gender = newGender !== "#" ? newGender : account.gender;
        account.avatar = newPhoto;
        console.log(newPhoto);
      }
    }
    localStorage.setItem("userDoc", JSON.stringify(user.userDoc));
    sessionStorage.setItem("userInSession", JSON.stringify(account));

    name.innerHTML = "Name: " + newName;
    email.innerHTML = "Email: " + newEmail;
    age.innerHTML = "Age: " + (newAge !== "" ? newAge : account.dateOfBirth);
    gender.innerHTML = "Gender: " + (newGender !== "#" ? newGender : account.gender);
    avatar.src = newPhoto;
    modal.style.display = "none";
  });
});

//Button Admin
admin.addEventListener("click", function () {
  const adminCont = document.querySelector(".admin-container");
  adminCont.innerHTML = `
    <div class="adminFunctions">
      <button type="button" id="users">Manage Users</button>
      <button type="button" id="rooms">Manage Rooms</button>
      <button type="button" id="questions">Manage Questions</button>
      <button type="button" id="scoreTime">Manage Score & Time</button>
    </div>
    <table class="content-table"></table>
  `;

  const userManage = document.getElementById("users");
  userManage.addEventListener("click", renderUsersTable);
});

function renderUsersTable() {
  const table = document.querySelector(".content-table");
  let template = `<thead><tr>
    <th>Name</th>
    <th>Email</th>
    <th>Age</th>
    <th>Gender</th>
    <th>Score</th>
    <th>Type</th>
    <th>Actions</th>
  </tr></thead><tbody>`;

  user.exportAllUsers().forEach((user) => {
    template += `<tr>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.dateOfBirth}</td>
    <td>${user.gender}</td>
    <td>${user.score}</td>
    <td>${user.type}</td>
    <td><button type="button" id="rem">Remove</button></td>
    </tr>`;
  });

  template += `
    <tr>
      <td colspan="7">
        <button type="button" id="add" style="width: 100%;">Add</button>
      </td>
    </tr>
  </tbody>`;

  table.innerHTML = template;

  const rem=document.querySelectorAll("#rem")
  rem.forEach((button,index) => {
    button.addEventListener("click",function(){
        user.userDoc.pop(index)
        localStorage.setItem("userDoc",JSON.stringify(user.userDoc))
        renderUsersTable()
    })
  });

  const add=document.getElementById("add")
  add.addEventListener("click",function(){
    modalContent.innerHTML = `<span class="close">&times;</span>
    <form method="get">
    <div class="form-input">
      <input
        type="text"
        name="username"
        id="newUsername"
        placeholder="Name"
        required
      />
    </div>

    <div class="form-input">
      <input
        type="email"
        name="email"
        id="newEmail"
        placeholder="Email"
        required
        />
    </div>
    <div class="form-input">
      <input
        type="date"
        name="dateOfBirth"
        id="newDateOfBirth"
        placeholder="Date of Birth"
        required
      />
    </div>

    <div class="form-input">
      <select name="gender" id="newGender" >
        <option value="#" disabled selected>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="form-check-inline">
      <input class="form-check-input" type="radio" name="typeUser" id="user" value="user">
      <label class="form-check-label" for="user">
       User
      </label>
      <input class="form-check-input" type="radio" name="typeUser" id="admin" value="admin" checked>
      <label class="form-check-label" for="admin">
        Admin
    </label>
    </div>
    <div class="form-input">
          <button type="submit" id="addAccount">Add Account</button>
    </div>
    </form>`;
    modal.style.display = "flex";

    const submit= document.querySelector(".form-input button")
    submit.addEventListener("click",function(event){
      event.preventDefault()
      const addName = document.getElementById("newUsername").value;
      const addEmail = document.getElementById("newEmail").value;
      const addAge = document.getElementById("newDateOfBirth").value;
      const addGender = document.getElementById("newGender").value;
      const type = document.querySelector('input[name="typeUser"]:checked').value;
      console.log(type)

      const newUser=user.createUser(
        user.generateId(),
        addName,
        addEmail,
        user.getAge(addAge),
        addGender,
      );

      newUser.type=type
      modal.style.display="none"
      renderUsersTable()
    })

    const close = document.querySelector(".modal-content span");
    close.addEventListener("click", () => (modal.style.display = "none"));
    })

    
  }

  
