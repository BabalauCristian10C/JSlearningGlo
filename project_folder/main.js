let income = "Stock Market", 
    mission = 45321;


let money = +prompt("Ваш месячный доход?", '0');
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = confirm("Есть ли у вас депозит в банке?");
let question1 = prompt("Введите обязательную статью расходов?");
let answer1 = parseInt(prompt("Во сколько это обойдется?"), 10);
let question2 =prompt("Введите обязательную статью расходов?");
let answer2 = parseInt(prompt("Во сколько это обойдется?"), 10);
let budgetMonth = money - answer1 - answer2;
let budgetDay = Math.floor(budgetMonth/30);
let period = Math.ceil(mission/budgetMonth);


console.log(typeof money + ' ' + typeof income + ' ' + typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцу \n"  + "Цель заработать " + mission + " колумбийских песо");
console.log(addExpenses.toLowerCase().split(', '));
console.log("Бюджет на месяц: " + budgetMonth);
console.log("Цель будет достигнута за: " + period);
console.log("Бюджет на день: " + budgetDay);

if (budgetDay > 1200) {
    console.log("У вас высокий уровень дохода");
} else if (budgetDay>600 && budgetDay<1200 ) {
    console.log("У вас средний уровень дохода");
} else if (budgetDay < 600 && budgetDay > 0) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
} else {
    console.log("что то пошло не так");
}

