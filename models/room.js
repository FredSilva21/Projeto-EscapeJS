import { generateId } from "./user.js";

export class Room {
  id = 0;
  name = "";
  description="";
  photo = "";
  icon="";
  levels = [];

  constructor(id, name, description, photo, icon, levels) {
    this.id = id;
    this.name = name;
    this.description=description
    this.photo = photo;
    this.icon=icon
    this.levels = levels;
  }

  // Methods

  addLevel(level) {
    this.levels.push(level);
  }

  removeLevel(levelName) {
    for (let level in this.levels) {
      if (this.levels[level].name === levelName) {
        this.levels.splice(level, 1);
        return;
      }
    }
    throw Error(`Level ${levelName} not found`);
  }
}

// Load Rooms from local storage
export let roomDoc;

export function init() {
  roomDoc = localStorage.roomDoc
    ? JSON.parse(localStorage.roomDoc)
    : [
      {
        id: 1,
        name: "Chapter 1:The Beggining",
        description:"First Room, will you make it to the end?",
        photo: "../public/images/room1.png",
        icon:"../public/images/room1 icon.png",
        levels: [],
      },
      {
        id: 2,
        name: "Chapter 2:Working Hard",
        description:"First Room, will you make it to the end?",
        photo: "../public/images/room2.png",
        icon:"../public/images/room2 icon.png",
        levels: [],
      },
      {
        id: 3,
        name: "Chapter 3:Final Bosses",
        description:"First Room, will you make it to the end?",
        photo: "../public/images/room3.png",
        icon:"../public/images/room3 icon.png",
        levels: [],
      }, 
      ];

    localStorage.setItem("roomDoc", JSON.stringify(roomDoc));
}

export function addRoom(name, photo, levels) {
  if (roomDoc.some((room) => room.name === name)) {
    throw Error(`Room ${name} already exists!`);
  } else {
    roomDoc.push(new Room(generateId(id), name, photo, levels));
    localStorage.roomDoc = JSON.stringify(roomDoc);
  }
}

export function deleteRoom(name) {
  const position = roomDoc.findIndex((user) => user.name === name);
  if (position !== -1) {
    roomDoc.splice(position, 1);
    localStorage.roomDoc = JSON.stringify(roomDoc);
  } else {
    return new Error(`${name}: is not present in the database`);
  }
}