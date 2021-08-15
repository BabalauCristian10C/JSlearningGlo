'use strict';


let argumentsElement = [],
      space = document.getElementsByClassName("created-element")[0];

function getArguments(){
      const inputs = document.querySelectorAll("[type='text']");
      inputs.forEach(element => {
            argumentsElement.push(element.value);
      });
}



const ElementCreator = function(selector, height, width, bg, fontSize){
      this.selector = selector;
      this.height = height;
      this.width =  width;
      this.bg = bg;
      this.fontSize = fontSize;
      this.argsArr = [this.selector, this.height, this.width, this.bg, this.fontSize];
};


ElementCreator.prototype.setAttribute = function(){
      this.ElementItSelf.style.cssText=

      `
      height: ${this.height}px;
      width: ${this.width}px;
      background-color: ${this.bg};
      font-size: ${this.fontSize}px;
      text-align:center;
      justify-content:space-around;
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
      this.ElementItSelf.innerHTML = "<span style = 'display: flex; justify-content: center; flex-direction: column; align-content: space-between; ' >TestEl</span>";
};



document.querySelector("button").addEventListener("click", function (event) {
      if (document.querySelector(".remove")){
          document.querySelector(".remove").remove();  
      }
      
      getArguments();
      const DomElement = new ElementCreator(...argumentsElement);
      DomElement.createElement();
      DomElement.setAttribute();  
      event.preventDefault();
      argumentsElement = [];
});

