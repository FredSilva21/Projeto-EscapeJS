import { generateId } from "./user.js";
export class question {
  id = "";
  name = "";
  options = [];
  solution = 0;
  solved = 0;

  constructor(id, name, options, solution, solved, creator_id) {
    this.id = generateId(id);
    this.name = name;
    this.options = options;
    this.solution = solution;
    this.solved = solved;
    this.creator_id = creator_id;
  }
}
