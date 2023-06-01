import * as user from "../../models/user.js";

user.init();
renderTable();

function renderTable() {
  const table = document.querySelector(".rankingTable");
  let position = 1;
  let template = `
    <tr>
      <th>Position</th>
      <th>Name</th>
      <th>Score</th>
      <th>Type</th>
    </tr>`;

  const userData = user.exportAllUsers();
  const sortedData = userData.sort((a, b) => b.score - a.score); // Sort by score in descending order

  for (const player of sortedData) {
    template += `
      <tr>
        <td>${position}º</td>
        <td>${player.name}</td>
        <td>${player.score}</td>
        <td>${player.type}</td>
      </tr>`;

    position++;
  }

  table.innerHTML = template;
}

