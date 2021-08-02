let money, income = "Stock Market", addExpenses, deposit, mission = 45321,period;
let q1,a1,q2,a2;

money = +prompt("Ваш месячный доход?", '0');
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");
q1 = prompt("Введите обязательную статью расходов?");
a1 = parseInt(prompt("Во сколько это обойдется?"), 10);
q2 = prompt("Введите обязательную статью расходов?");
a2 = parseInt(prompt("Во сколько это обойдется?"), 10);
let budgetMonth = money - a1 - a2;
let budgetDay = Math.floor(budgetMonth/30);
period = Math.ceil(mission/budgetMonth);
let randArr = [money,income,addExpenses,deposit,mission,period];

console.log(typeof randArr[0] + ' ' + typeof randArr[1] + ' ' + typeof randArr[3]);
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

