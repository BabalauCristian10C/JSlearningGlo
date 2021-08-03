'use strict';


let income = "Stock Market", 
    mission = 45000;

function showTypeOf(variable){
    return typeof variable;
}

const getExpensesMonth = function (num1, num2){
    const expensesMonth = num1 + num2;
    return expensesMonth;
};

const getAccumulatedMonth = function (income, callback){
    const rest = income - callback;
    return rest;
};

const getTargetMonth = function (scope, accumulated){
    const period = Math.ceil(scope/accumulated);
    return period;
};

const getStatusIncome = function (budgetDay) {
    if (budgetDay > 1200) {
        return "У вас высокий уровень дохода";
    } else if (budgetDay>600 && budgetDay<1200 ) {
        return "У вас средний уровень дохода";
    } else if (budgetDay < 600 && budgetDay > 0) {
        return "К сожалению у вас уровень дохода ниже среднего";
    } else {
        return "что то пошло не так";
    }
}

let money = +prompt("Ваш месячный доход?", '0');
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = confirm("Есть ли у вас депозит в банке?");
let question1 = prompt("Введите обязательную статью расходов?");
let answer1 = parseInt(prompt("Во сколько это обойдется?"), 10);
let question2 =prompt("Введите обязательную статью расходов?");
let answer2 = parseInt(prompt("Во сколько это обойдется?"), 10);

let monthExpenses = getExpensesMonth(answer1, answer2);
let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(answer1, answer2));
let period = getTargetMonth(mission, accumulatedMonth);
let budgetDay = Math.floor(accumulatedMonth/30);


console.log(showTypeOf(money) + ' ' + showTypeOf(income) + ' ' + showTypeOf(deposit));
console.log(monthExpenses);
console.log(addExpenses.toLowerCase().split(', '));
console.log("Период равен " + period + " месяцу / месяцев \n"  + "Цель заработать " + mission + " колумбийских песо");
console.log("Бюджет на день: " + budgetDay);
console.log(getStatusIncome(budgetDay));
