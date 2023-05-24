export class Room {
  id=0;
  name="";
  photo="";
  levels=[]

  constructor(id, name, photo, levels) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.levels = levels;
  }
}

let rooms=[]

export function init() {
  if(rooms.length==0){
    rooms=[
      {
        id: 1,
        name: "Chapter 1:The Beggining",
        photo:"../public/images/room1",
        levels:[]
      },
    ];
  }
}
