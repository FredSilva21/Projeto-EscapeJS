import * as user from "../../models/user.js";

// const adminBtn=document.querySelector(".adminButton")
// const modal=document.querySelector("#modal")

// adminBtn.addEventListener("click",(e)=>{
//     e.preventDefault()
//     modal.style.display="flex"
// })

const loggedUser = user.inSession();

const name=document.getElementById("name")
const email=document.getElementById("email")
const age=document.getElementById("age")
const gender=document.getElementById("gender")
const levels=document.getElementById("levels")
const score=document.getElementById("score")
user.init();

if(loggedUser){
    name.innerHTML+=user.userAuth().name
    email.innerHTML+=user.userAuth().email
    age.innerHTML+=user.userAuth().age
    gender.innerHTML+=user.userAuth().gender
    levels.innerHTML+=user.userAuth().rooms.length
    score.innerHTML+=user.userAuth().score
}

