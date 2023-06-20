export function init(){
  localStorage.setItem("Time",JSON.stringify(600))
}

export function startTime() {
  const startMinutes = localStorage.getItem("Time");
  let time = sessionStorage.getItem("remainingTime") || startMinutes;

  const countDown = document.getElementById("countdown");
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  countDown.innerHTML = `${minutes}:${seconds}`;

  if (time > 0) {
    time--;
  } else {
    clearInterval(intervalId); // Interrompe o intervalo quando o tempo acaba
    const modal = document.getElementById("modal");
    const modalBody = document.querySelector(".modal-body");
    const h2 = document.querySelector(".modal-content h2");

    modal.style.display = "flex";
    h2.innerHTML = "Time's Up!";
    modalBody.innerHTML = `
      <div><p>Oops! Your time has run out.</p></div>
      <div><p>Bonus Score: +0</p></div>
    `;

    setTimeout(() => {
      window.location.href = "./catalog.html";
    }, 2000);
  }

  // Armazene o tempo restante no sessionStorage
  sessionStorage.setItem("remainingTime", time);
}

export function stopTime() {
  clearInterval(intervalId); // Interrompe o intervalo
  sessionStorage.removeItem("remainingTime"); // Limpa o valor do sessionStorage
}

export function wrongAnswerTime() {
  let time = parseInt(sessionStorage.getItem("remainingTime"));
  time -= 5;
  sessionStorage.setItem("remainingTime", JSON.stringify(time));
}


// Inicie o intervalo de tempo e armazene o ID do intervalo na variável intervalId
const intervalId=setInterval(startTime, 1000);