import * as user from "../../models/user.js";

user.init(); 

const profile=document.querySelector("#profile")
console.log(profile)
if(user.userDoc.find((item)=>item.isLogged==true)){
    profile.href="./profile.html"
    profile.textContent="Profile"
}