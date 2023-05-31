import * as user from "../../models/user.js";

// const adminBtn=document.querySelector(".adminButton")
const modal=document.querySelector("#modal")
const modalContent=document.querySelector(".modal-content")
// adminBtn.addEventListener("click",(e)=>{
//     e.preventDefault()
//     modal.style.display="flex"
// })

const loggedUser = user.inSession();
//Get h3
const name=document.getElementById("name")
const email=document.getElementById("email")
const age=document.getElementById("age")
const gender=document.getElementById("gender")
const levels=document.getElementById("levels")
const score=document.getElementById("score")

//call user init
user.init();
injectProfile()


//If found an user logged in session storage
function injectProfile(){
    if(loggedUser){
        name.innerHTML+=user.userAuth().name
        email.innerHTML+=user.userAuth().email
        age.innerHTML+=user.userAuth().dateOfBirth
        gender.innerHTML+=user.userAuth().gender
        levels.innerHTML+=user.userAuth().rooms.length
        score.innerHTML+=user.userAuth().score
    }
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
    close.addEventListener("click", function () {
        modal.style.display = "none";
      });
})
