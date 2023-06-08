const startMinutes=10
let time=startMinutes*60

const countDown=document.getElementById("countdown")

setInterval(startTime,1000)
function startTime(){
    let minutes=Math.floor(time/60)
    let seconds=time % 60

    seconds=seconds<10 ? "0" + seconds :seconds

    countDown.innerHTML=`${minutes}:${seconds}`
    time--
}