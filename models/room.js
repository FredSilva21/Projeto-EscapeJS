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
      {
        id:2,
        name:"Chapter 2:Working Hard",
        photo:"../public/images/room2",
        levels:[]
      },
      {
        id:3,
        name:"Chapter 3:Final Bosses",
        photo:"../public/images/room3",
        levels:[]
      }
    ];
  }
}
