'use strict';

let argumentsElement = [".square", "100", "100", "black", "absolute"],
    space = document.body;
const ElementCreator = function(selector, height, width, bg, position){
      this.selector = selector;
      this.height = height;
      this.width =  width;
      this.bg = bg;
      this.position = position;
};



ElementCreator.prototype.setAttribute = function(){
      this.ElementItSelf.style.cssText=
      `
      height: ${this.height}px;
      width: ${this.width}px;
      background-color: ${this.bg};
      position: absolute;
      text-align:center;
      justify-content:space-around;
      left:0px;
      right:0px;
      top:0px;
      bottom:-199px;
      `;
      space.append(this.ElementItSelf);

};

ElementCreator.prototype.createElement = function(){
      const selector = this.selector;
      if (selector[0] === "."){
            this.ElementItSelf = document.createElement("div");
            this.ElementItSelf.classList.add(`${selector.slice(1)}`);
            this.ElementItSelf.classList.add(`remove`);
      } else if (selector[0] === "#"){
            this.ElementItSelf = document.createElement("p");
            this.ElementItSelf.setAttribute("id", `${selector.slice(1)}`);
            this.ElementItSelf.classList.add(`remove`);
      }else{
            console.log("The selector you gave is doesn't meet the requirements.");
            return;
      }
      this.ElementItSelf.innerHTML = "<span style = 'color:white; text-align: center;' > tetris </span>";
};



const DomElement = new ElementCreator(...argumentsElement);

DomElement.createElement();
DomElement.setAttribute();  

window.addEventListener("keydown", function(event){
      if(event.key === "ArrowUp"){
            DomElement.ElementItSelf.style.top = (parseInt(DomElement.ElementItSelf.style.top,10) - 10) + "px";
      } else if (event.key === "ArrowDown"){
            DomElement.ElementItSelf.style.top = (parseInt(DomElement.ElementItSelf.style.top,10) + 10) + "px";
      } else if (event.key === "ArrowLeft"){
            DomElement.ElementItSelf.style.left = (parseInt(DomElement.ElementItSelf.style.left,10) - 10) + "px";
      } else if (event.key === "ArrowRight"){
            DomElement.ElementItSelf.style.left = (parseInt(DomElement.ElementItSelf.style.left,10) + 10) + "px";
      } else {
            console.log("oops");
      }
});