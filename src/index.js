import Model from "./Model.js";
import View from "./View.js";


class Controller {
  constructor(model, view) {
    this.model = new Model();
    this.view = new View();

    this.view.playEvent.addListener((move) => {
      this.model.play(move);
    });

    this.model.updateCellEvent.addListener((data) =>
      this.view.updateCell(data)
    );
    this.model.victoryEvent.addListener((winner) => this.view.victory(winner));
    this.model.drawEvent.addListener(() => this.view.draw());
  }
}

const app = new Controller();
