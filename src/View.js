import Event from "./Event.js";
export default class View {
    constructor() {
      this.playEvent = new Event();
      this.board = this.defaultBoard();
    }
    defaultBoard() {
      const root = document.getElementById("root");
      const parentDiv = this.createElement("div", [], ["parent"]);
      for (let i = 0; i < 49; i++) {
        const div = this.createElement("div", [], [`div${i + 1}`]);
        div.addEventListener("click", () => {
          this.playEvent.trigger(i);
        });
        parentDiv.append(div);
      }
      root.append(parentDiv);
    }
    createElement(tagName, children = [], classes = [], attributes = {}) {
      // create new element in more comfortable
      const el = document.createElement(tagName);
      for (let child of children) {
        // append childs of element
        el.append(child);
      }
      for (let cls of classes) {
        // add all the classes to the element
        el.classList.add(cls);
      }
      for (let attr in attributes) {
        // add all attributes to the element
        el.setAttribute(attr, attributes[attr]);
      }
      return el;
    }
  
    updateCell(data) {
      if (data.move || data.move === 0) {
        document.querySelector(`.div${data.move + 1}`).style.backgroundColor =
          data.player;
      }
    }
  
    victory(winner) {
      alert(`${winner} wins!`);
    }
  
    draw() {
      alert("It's a draw!");
    }
  }