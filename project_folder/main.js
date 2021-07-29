let money, income, addExpenses, deposit, mission, period;

let randArr = ['money','income', 'addExpenses', 'deposit','mission','period'];

let spans = document.getElementsByClassName("varName");

for ( let i = 0; i < randArr.length; i++){
    spans[i].innerHTML = randArr[i];
}

alert("success");

console.log(Symbol(4));