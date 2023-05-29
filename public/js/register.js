import * as user from "../../models/user.js";

// renderForm();
user.init();

// const form = document.querySelector("form");

// const submit = form.querySelector('button[type="submit"]');

// if (submit.textContent == "Sign Up") {
//   submit.addEventListener("click", (e) => {
//     e.preventDefault();

//     //Form
//     const name = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const age = document.getElementById("dateOfBirth").value;
//     const gender = document.getElementById("gender").value;
//     const pwd = document.getElementById("password").value;
//     const confirmPwd = document.getElementById("confirm-password").value;

//     //Modal
//     const modal = document.getElementById("modal");
//     const h2 = document.querySelector(".modal-content h2");
//     const prg = document.querySelector(".modal-content p");
//     const close = document.getElementsByClassName("close")[0];
//     close.addEventListener("click", function () {
//       modal.style.display = "none";
//     });

//     if (pwd !== confirmPwd) {
//       modal.style.display = "flex";
//       h2.innerHTML = "Error";
//       prg.innerHTML = "Passwords must be equal!";
//       return;
//     }

//     if (user.userDoc.find((user) => user.name === name)) {
//       modal.style.display = "flex";
//       h2.innerHTML = "Error";
//       prg.innerHTML = "Already have an account with the same username!";
//       return;
//     }

//     if (user.userDoc.find((user) => user.email === email)) {
//       modal.style.display = "flex";
//       h2.innerHTML = "Error";
//       prg.innerHTML = "Already have an account with the same email!";
//       return;
//     }

//     user.createUser(
//       user.generateId(),
//       name,
//       email,
//       user.getAge(age),
//       gender,
//       pwd
//     );
//     setTimeout(function () {
//       modal.style.display = "flex";
//       h2.innerHTML = "Success";
//       prg.innerHTML = "Registed successfully!";
//     });

//     renderLoginForm();
//   });
// } else if (submit.textContent == "Sign In") {
//   submit.addEventListener("click", (e) => {
//     e.preventDefault();

//     const name = document.getElementById("username").value;
//     const pwd = document.getElementById("password").value;
//     const modal = document.getElementById("modal");
//     const prg = document.querySelector(".modal-content p");
//     const close = document.getElementsByClassName("close")[0];
//     close.addEventListener("click", function () {
//       modal.style.display = "none";
//     });

//     if(user.login(name,pwd)){
//       console.log("TESTE")
//       window.location.replace("../../index.html");
//     }
    
//   });
// }

//Render form sign in or sign up
// function renderForm() {
//   const anc = document.querySelector(".has_account a");
//   const form = document.querySelector("form");

//   if (anc.textContent == "Sign In") {
//     anc.addEventListener("click", (e) => {
//       e.preventDefault();
//       form.innerHTML = `<h1>Sign In</h1>
//         <div class="form-input">
//           <input
//             type="text"
//             name="username"
//             id="username"
//             placeholder="Name"
//             required
//           />
//         </div>

//         <div class="form-input">
//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Password"
//             required
//           />
//         </div>

//         <div class="form-input">
//           <button type="submit">Sign In</button>
//           <span class="has_account">
//             Don't have an account? <a href="./register.html">Sign Up</a>
//           </span>
//         </div>`;
//     });
//   } /*else if (anc.textContent == "Sign Up") {
//     anc.addEventListener("click", (e) => {
//       e.preventDefault();
//       renderLoginForm(name,pwd)
//       )}*/
// }

//Function to render login form after registed
// function renderLoginForm() {
//   console.log()
//   const form = document.querySelector("form");
//   form.innerHTML = `<h1>Sign In</h1>
//     <div class="form-input">
//       <input
//         type="text"
//         name="username"
//         id="username"
//         placeholder="Name"
//         required
//       />
//     </div>

//     <div class="form-input">
//       <input
//         type="password"
//         name="password"
//         id="password"
//         placeholder="Password"
//         required
//       />
//     </div>

//     <div class="form-input">
//       <button type="submit">Sign In</button>
//       <span class="has_account">
//         Don't have an account? <a href="./register.html">Sign Up</a>
//       </span>
//     </div>`;
//     console.log("ENTROU AQUI")
// }

// form.addEventListener("click", function (event) {   
//   event.preventDefault()
//   console.log("AQUI")
//   if (user.login('Rui Silva', 'Xeixas!47')) {
//     console.log("AQUI")
//     // renderAfterLogin();
//   }else{
//     console.log("ERRO")
//   }
// });

// Redirect User to Home after login
/* function renderAfterLogin() {
  console.log("ENTROU AQUI")
  // window.location.replace("../../index.html");
} */

//Modal
const modal = document.getElementById("modal");
const h2 = document.querySelector(".modal-content h2");
const prg = document.querySelector(".modal-content p");
const close = document.getElementsByClassName("close")[0];
// Função que faz o Registo de utilizador
function register(){    
        //Form
        const name = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const age = document.getElementById("dateOfBirth").value;
        const gender = document.getElementById("gender").value;
        const pwd = document.getElementById("password").value;
        const confirmPwd = document.getElementById("confirm-password").value;

        close.addEventListener("click", function () {
          modal.style.display = "none";
        });
    
        if (pwd !== confirmPwd) {
          modal.style.display = "flex";
          h2.innerHTML = "Error";
          prg.innerHTML = "Passwords must be equal!";
          return;
        }
    
        if (user.userDoc.find((user) => user.name === name)) {
          modal.style.display = "flex";
          h2.innerHTML = "Error";
          prg.innerHTML = "Already have an account with the same username!";
          return;
        }
    
        if (user.userDoc.find((user) => user.email === email)) {
          modal.style.display = "flex";
          h2.innerHTML = "Error";
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
        setTimeout(function () {
          modal.style.display = "flex";
          h2.innerHTML = "Success";
          prg.innerHTML = "Registed successfully!";
        });
}

// Quando clicamos no butão Sign Up chama a função de registo
document.getElementById("register").addEventListener("submit", function(event){
    event.preventDefault()
    register()
})

// Quando clicamos no butão de Sign In iremos fazer o login do utilizador
document.getElementById("login").addEventListener("submit", function(event){
    event.preventDefault(event)
    const name = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;
    if(user.login(name,password)){
      console.log("Acertou")
      window.location.replace("../../index.html");
    }else{
      modal.style.display = "flex";
      h2.innerHTML = "Error";
      prg.innerHTML = "You have entered an invalid username or password";
      close.addEventListener("click", function () {
        modal.style.display = "none";
      });
    }
})

// Mudar do Formulário de Registo para o de Login
function changeToRegister(){
  let formRegister = document.getElementById("register")
  let formLogin = document.getElementById("login")
  formRegister.style.display = "none"
  formLogin.style.display="block"
}

document.getElementById('changeLogin').addEventListener("click", function(){
  changeToRegister()
})

// Mudar do Formulário Login para Registo
function changeToLogin(){
  let formRegister = document.getElementById("register")
  let formLogin = document.getElementById("login")
  formRegister.style.display = "block"
  formLogin.style.display="none"
}

document.getElementById('changeRegister').addEventListener("click", function(){
  changeToLogin()
})