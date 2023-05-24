export class Room {
  id = 0;
  title = "";
  photo = "";
  levels = [];
  constructor(id, title, photo, levels) {
    this.id = id;
    this.title = title;
    this.photo = photo;
    this.levels = levels;
  }
}

// Load the rooms from LocalStorage
export let roomDoc;

export function init() {
  roomDoc = localStorage.roomDoc ? JSON.parse(localStorage.roomDoc) : [];
}

// Add new Room
export function addRoom(title, photo, levels) {
  if (roomDoc.some((room) => room.title === title)) {
    throw Error(`Room ${title} already exists, try another.`);
  }
}
