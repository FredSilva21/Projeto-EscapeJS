const adminBtn=document.querySelector(".adminButton")
const modal=document.querySelector("#modal")

adminBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    modal.style.display="flex"
})