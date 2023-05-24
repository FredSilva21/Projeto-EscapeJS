import * as user from "../../models/user.js";

renderForm();
user.init();

const form = document.querySelector("form");

const submit = form.querySelector('button[type="submit"]');

if (submit.textContent == "Sign Up") {
  submit.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("dateOfBirth").value;
    const gender = document.getElementById("gender").value;
    const pwd = document.getElementById("password").value;
    const confirmPwd = document.getElementById("confirm-password").value;

    const modal = document.getElementById("modal");
    const prg = document.querySelector(".modal-content p");
    const close = document.getElementsByClassName("close")[0];
    close.addEventListener("click", function () {
      modal.style.display = "none";
    });

    if (pwd !== confirmPwd) {
      modal.style.display = "flex";
      prg.innerHTML = "Passwords must be equal!";
      return;
    }

    if (user.userDoc.find((user) => user.name === name)) {
      modal.style.display = "flex";
      prg.innerHTML = "Already have an account with the same username!";
      return;
    }

    if (user.userDoc.find((user) => user.email === email)) {
      modal.style.display = "flex";
      prg.innerHTML = "Already have an account with the same email!";
      return;
    }

    user.createUser(
      user.generateId(),
      name,
      email,
      user.getAge(age),
      gender,
      pwd
    );

    renderLoginForm();
  });
} else {
  submit.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("username").value;
    const pwd = document.getElementById("password").value;
    const modal = document.getElementById("modal");
    const prg = document.querySelector(".modal-content p");
    const close = document.getElementsByClassName("close")[0];
    close.addEventListener("click", function () {
      modal.style.display = "none";
    });

    if (user.userDoc.find((item) => item.name == name)) {
      if (user.userDoc.find((item) => item.pwd != pwd)) {
        modal.style.display="flex"
        prg.innerHTML="Wrong password.Try again!"
      }
    }

    if(user.login(name,pwd)){
      window.location.href="../index.html"
    }
  });
}

//Render form sign in or sign up
function renderForm() {
  const anc = document.querySelector(".has_account a");
  const form = document.querySelector("form");

  if (anc.textContent == "Sign In") {
    anc.addEventListener("click", (e) => {
      e.preventDefault();
      form.innerHTML = `<h1>Sign In</h1>
        <div class="form-input">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Name"
            required
          />
        </div>

        <div class="form-input">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <div class="form-input">
          <button type="submit">Sign In</button>
          <span class="has_account">
            Don't have an account? <a href="./register.html">Sign Up</a>
          </span>
        </div>`;
    });
  } else if (anc.textContent == "Sign Up") {
    anc.addEventListener("click", (e) => {
      e.preventDefault();
      renderLoginForm()
    }
  )}
}

//Function to render login form after registed
function renderLoginForm() {
  const form = document.querySelector("form");
  form.innerHTML = `<h1>Sign In</h1>
    <div class="form-input">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Name"
        required
      />
    </div>

    <div class="form-input">
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
      />
    </div>

    <div class="form-input">
      <button type="submit">Sign In</button>
      <span class="has_account">
        Don't have an account? <a href="./register.html">Sign Up</a>
      </span>
    </div>`;
  renderAfterLogin();
}

// Redirect User to Home after login
function renderAfterLogin() {
  window.location.href = "../../index.html";
}
