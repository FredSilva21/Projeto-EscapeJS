import { generateId } from "./user.js";

export class Room {
  id = 0;
  name = "";
  photo = "";
  levels = [];

  constructor(id, name, photo, levels) {
    this.id = id;
    this.name = name;
    this.photo = photo;
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
        photo: "../public/images/room1",
        levels: [],
      },
      {
        id: 2,
        name: "Chapter 2:Working Hard",
        photo: "../public/images/room2",
        levels: [],
      },
      {
        id: 3,
        name: "Chapter 3:Final Bosses",
        photo: "../public/images/room3",
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