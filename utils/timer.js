let intervalId; // Variável para armazenar o ID do intervalo

export function startTime() {
  const startMinutes = 10;
  let time = sessionStorage.getItem("remainingTime") || startMinutes * 60;

  const countDown = document.getElementById("countdown");
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  countDown.innerHTML = `${minutes}:${seconds}`;

  if (time > 0) {
    time--;
  } else {
    clearInterval(intervalId); // Interrompe o intervalo quando o tempo acaba
  }

  // Armazene o tempo restante no sessionStorage
  sessionStorage.setItem("remainingTime", time);
}

export function stopTime() {
  clearInterval(intervalId); // Interrompe o intervalo
  sessionStorage.removeItem("remainingTime"); // Limpa o valor do sessionStorage
}

// Inicie o intervalo de tempo e armazene o ID do intervalo na variável intervalId
intervalId = setInterval(startTime, 1000);
