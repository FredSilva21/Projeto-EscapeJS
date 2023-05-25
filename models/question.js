export class question {
  constructor(id, name, options, solution, solved, creator_id) {
    this.id = id;
    this.name = name;
    this.options = options;
    this.solution = solution;
    this.solved = solved;
    this.creator_id = creator_id;
  }
}
