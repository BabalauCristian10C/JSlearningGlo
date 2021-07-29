
let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;

var randArr = ['money','income', 'addExpenses', 'deposit','mission','period'];

var spans = document.getElementsByClassName("varName");

for ( let i = 0; i < randArr.length; i++){
    spans[i].innerHTML = randArr[i];
}

swal("как же я хочу этот диплом..");

console.log(Symbol(4));