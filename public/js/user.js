import * as user from "../../models/user";

// const adminBtn=document.querySelector(".adminButton")
// const modal=document.querySelector("#modal")

// adminBtn.addEventListener("click",(e)=>{
//     e.preventDefault()
//     modal.style.display="flex"
// })

const loggedUser = user.inSession();

user.init();


document.querySelector(".score").value = loggedUser.score;

