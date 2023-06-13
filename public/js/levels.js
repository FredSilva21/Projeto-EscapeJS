import * as Room from "../../models/room.js"
import * as Question from "../../models/question.js" 

Room.init()
//Get variable in url
const urlParams = new URLSearchParams(window.location.search);
const levelId = urlParams.get('levelId');

let level;
for (const room of Room.roomDoc) {
  level = room.levels.find(level => level.id == levelId);
  if (level) {
    break;
  }
}

// Set the innerHTML of the title element
const title = document.querySelector("h3");
title.innerHTML = `Level ${levelId}-${level.name}`;

function renderLevel(){
    const levelContainer=document.querySelector(".level-container")
}