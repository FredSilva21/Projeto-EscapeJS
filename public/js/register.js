import * as user from "../../models/user"

const form = document.querySelector("form");

const submit = form.querySelector('button[type="submit"]');

submit.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const pwd = document.getElementById("password").value;
  const confirmPwd = document.getElementById("confirm-password").value;

  if (pwd !== confirmPwd) {
    alert("Password must be equal.");
    return;
  }
});
