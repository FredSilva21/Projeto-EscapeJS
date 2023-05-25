export class Room {
  id=0;
  name="";
  photo="";
  questions=[]

  constructor(id, name, photo, questions) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.questions = questions;
  }
}

// Load Rooms from local storage
export let roomDoc

export function init() {
  if(roomDoc.length==0){
    roomDoc=[
      {
        id: 1,
        name: "Chapter 1:The Beggining",
        photo:"../public/images/room1",
        levels:[]
      },
    ];
  }
}
