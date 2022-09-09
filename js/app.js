//class that contains game logic
class Game {
  //class properties
  foundCircles = 0;
  totalCircles = 0;
  searchColor = "#99FF00";
  normalColor = "#7700AA";
  gameZone = document.getElementById("gameZone");
  foundBar = new FoundBar();

  constructor() {
    for (let i = 0; i < 25; i++) {
      //make circles
      let newCirc = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      //add circle style class
      newCirc.classList.add("gameCirc");
      newCirc.setAttribute("cx", Math.random() * 400);
      newCirc.setAttribute("cy", Math.random() * 400);

      //randomly what reveal color the circle is
      if (Math.random() < 0.3) {
        //set as looking for color
        newCirc.dataset.hiddenColor = this.searchColor;
        this.totalCircles++;
      } else {
        newCirc.dataset.hiddenColor = this.normalColor;
      }

      //mouse events
      //on mouse over, show hidden color
      newCirc.addEventListener("mouseover", (event) => {
        event.target.style.fill = event.target.dataset.hiddenColor;
      });

      newCirc.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#000";
      });

      newCirc.addEventListener("click", (event) => {
        //if user click on something with the looking for color
        if (event.target.dataset.hiddenColor == this.searchColor) {
          event.target.remove();

          //store how many have been found
          this.foundCircles++;

          //update the found bar
          this.foundBar.setPercent(this.foundCircles / this.totalCircles);
        }
      });

      //add circle to the screen
      this.gameZone.appendChild(newCirc);
    }
  }
}

class FoundBar {
  element = document.getElementById("foundBar");
  maxSize = 130;
  percent = 0;

  setPercent(percent) {
    this.percent = percent;
    this.element.setAttribute("width", this.percent * this.maxSize);
  }
}

let g = new Game();
