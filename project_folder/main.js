'use strict';


let income = "Stock Market", 
    mission = 45000,
    listOfQuestions = [];

function showTypeOf(variable){
    return typeof variable;
}

const getIncomeMonth = function(){
    let moneyMonth;
    do {
        moneyMonth = parseInt(prompt("Ваш месячный доход?", '0'), 10 );
    }
    while(isNaN(moneyMonth));
    return moneyMonth;
}

const getExpensesMonth = function (){
    let sum = 0;
    let arrayIndex = 0;

    for (let i = 0; i < 4; i++){
        if (i % 2 === 0) { 
            listOfQuestions[arrayIndex] = prompt("Введите обязательную статью расходов?");
            arrayIndex++;
        } else {
            let answer = parseInt(prompt("Во сколько это обойдется?"), 10);
            if (isNaN(answer) || typeof answer === "string" || !answer) {
                --i;
            } else {
                sum += answer;
            } 
        }
    }
    return sum;
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
};

//month income
let money = getIncomeMonth();
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = confirm("Есть ли у вас депозит в банке?");
let monthExpenses = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth(money, monthExpenses);
let period = getTargetMonth(mission, accumulatedMonth);
let budgetDay = Math.floor(accumulatedMonth/30);


console.log(showTypeOf(money) + ' ' + showTypeOf(income) + ' ' + showTypeOf(deposit));
console.log(monthExpenses);
console.log(addExpenses.toLowerCase().split(', '));

if (period > 0 ){
    console.log("Цель будет достигнута через " + period + " месяцу / месяцев");
} else {
    console.log("Цель не будет достигнут ");
}

console.log("Бюджет на день: " + budgetDay);
console.log(getStatusIncome(budgetDay));