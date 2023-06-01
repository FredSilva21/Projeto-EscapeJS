import * as user from "../../models/user.js";

user.init();
navBar();

function navBar() {
  let result = `<img src="./public/images/logo.svg" width="250px" height="100px">
    <ul class="menu">
      <li><a href="index.html">Home</a></li>
      <li><a href="./views/catalog.html">Rooms</a></li>
      <li><a href="./views/ranking.html">Ranking</a></li>
      <li><a href="./views/about.html">About</a></li>
      <li><a href="./views/register.html">Sign In</a></li>
      <li><a href="./views/profile.html" class="profile">Profile</a></li>
    </ul>`;

  if (user.inSession()) {
    result = `<img src="./public/images/logo.svg" width="250px" height="100px">
      <ul class="menu">
        <li><a href="index.html">Home</a></li>
        <li><a href="./views/catalog.html">Rooms</a></li>
        <li><a href="./views/ranking.html">Ranking</a></li>
        <li><a href="./views/about.html">About</a></li>
        <li><a href="#" id="logout">Log Out</a></li>
        <li><a href="./views/profile.html" id="profile">Profile</a></li>
      </ul>`;
  }

  const nav = document.querySelector("nav");
  nav.innerHTML = result;

  const logoutLink = document.getElementById("logout");
  if (logoutLink) {
    logoutLink.addEventListener("click",function(){
        user.logout()
        navBar()
    });
  }
}

