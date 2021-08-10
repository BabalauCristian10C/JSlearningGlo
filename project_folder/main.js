'use strict';


let books = document.querySelectorAll(".book"),
      book2 = books[0],
      book1 = books[1],
      book6 = books[2],
      book4 = books[3],
      book3 = books[4],
      book5 = books[5],
      bookTitles = book2.querySelectorAll("li"),
      bookTitles2 = book5.querySelectorAll("li"),
      body = document.body,
      advertise = document.getElementsByClassName('adv')[0];

book1.after(book2);
book4.before(book3);
book5.after(book4);
book5.after(book6);
book5.before(book4);

body.style.backgroundImage = "url('image/you-dont-know-js.jpg')";
//3 -> 1 book title
bookTitles[3].after(bookTitles[6]);
bookTitles[6].after(bookTitles[8]);
bookTitles2[1].after(bookTitles2[9]);
bookTitles2[6].before(bookTitles2[2]);

book6.getElementsByTagName("li")[8].insertAdjacentHTML("afterend", "<li>Глава 8: За пределами ES6</li>");
console.log(bookTitles2);
book3.getElementsByTagName("a")[0].innerHTML = "Книга 3. this и Прототипы Объектов";
advertise.remove();