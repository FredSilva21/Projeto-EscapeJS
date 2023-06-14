setInterval(startTime, 1000);

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
  }

  // Armazene o tempo restante no sessionStorage
  sessionStorage.setItem("remainingTime", time);
}

// Limpe o sessionStorage quando necessário (por exemplo, quando o tempo deve ser redefinido)
sessionStorage.removeItem("remainingTime");
