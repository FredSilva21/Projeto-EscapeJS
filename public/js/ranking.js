import * as user from "../../models/user.js"

user.init()
renderTable()
function renderTable(){
    const table=document.querySelector(".rankingTable")
    let template=`<tr>
    <th>Position</th>
    <th>Name</th>
    <th>Score</th>
    </tr>`
    /*
    for(const player of user.User){
        template+=`<tr>
        <td>${player.name}</td>
        
        <th>Time <img src="../public/images/cronometro.png"></th>
        </tr>`
    }*/

    table.innerHTML=template
}
