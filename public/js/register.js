import * as user from "../../models/user.js"

window.onload=function(){
  renderForm()
}


const form = document.querySelector("form");

const submit = form.querySelector('button[type="submit"]');

submit.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("dateOfBirth").value;
  const gender = document.getElementById("gender").value;
  const pwd = document.getElementById("password").value;
  const confirmPwd = document.getElementById("confirm-password").value;

  if (pwd !== confirmPwd) {
    alert("Password must be equal.");
    return;
  }

  if (user.userDoc.find(user => user.name === name)) {
    alert("Already have an account with the same username.")
    return
  };

  if (user.userDoc.find(user => user.email === email)) {
    alert("Already have an account with the same email.")
    return
  };

  user.createUser(user.generateId(), name, email, user.calculateAge(age), gender, pwd)

  renderForm()
});

function renderForm() {
  const anc = document.querySelector(".has_account a")
  const form = document.querySelector("form")
  anc.addEventListener("click", (e) => {
    if (anc.textContent == "Sign In") {
      e.preventDefault()
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
        </div>`
    } else if (anc.textContent == "Sign Up") {
      form.innerHTML = `<h1>Sign Up</h1>
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
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>

          <div class="form-input">
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Date of Birth"
              required
            />
          </div>

          <div class="form-input">
            <select name="gender" id="gender" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div class="form-input">
            <button type="submit">Sign Up</button>
            <span class="has_account">
                Already have an account?<a href="./register.html">Sign In</a>
            </span>
            </span>
          </div>`
  }
}
)}