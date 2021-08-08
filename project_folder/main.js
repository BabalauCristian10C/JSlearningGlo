'use strict';


const start = function (){
    let moneyMonth;
    do {
        moneyMonth = parseInt(prompt("Ваш месячный доход?", '0'), 10 );
    } while(isNaN(moneyMonth));
    return moneyMonth;
};

let appData = {
    income: {},
    addIncome: [],
    expenses: {}, //задаём через функцию
    addExpenses: [],
    deposit: false,
    mission: 45000,
    period: 0, //задаём через функцию
    asking: function(){
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
            answer,
            index = 0;
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит?');
            function getExpenses () {
                let objectExpense = {},
                    expenseName = prompt("Введите обязательную статью расходов 2?");

                do {
                    answer = parseInt(prompt("Во сколько это обойдется?"), 10);
            
                } while (isNaN(answer));

                objectExpense[expenseName] = answer;
                return objectExpense;
            }
        while (index < 2) {
            let getExpensesObject = getExpenses();
            for (let value in getExpensesObject) {
                appData.expenses[value] = getExpensesObject[value];
            }
            index ++;
        }    
    },
    budget: start(),
    budgetDay: 0, //задаём через функцию
    budgetMonth: 0, //задаём через функцию
    expensesMonth: 0, //задаём через функцию
    getExpensesMonth: function (expense1, expense2) {
        let sum;
        sum = expense1 + expense2;
        return sum;
    },
    getBudget: function (income, expense) {
        const budgetMonth = income - expense;
        const budgetDay = budgetMonth / 30; 
        return [budgetMonth, budgetDay];
    },
    getTargetMonth: function (scope, accumulated){
        const period = Math.ceil(scope/accumulated);
        return period;
    },
    getStatusIncome: function (budgetDay) {
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
};


let budgetTotal;


// добавил пару переменых для более лёгкого обращения к этим элементам надеюсь ничего страшного

appData.asking(); // узнаёт расходы
let firstExpense = appData.expenses[Object.keys(appData.expenses)[0]],   secondExpense = appData.expenses[Object.keys(appData.expenses)[1]]; 

appData.expensesMonth = appData.getExpensesMonth(firstExpense, secondExpense);
budgetTotal = appData.getBudget(appData.budget, appData.expensesMonth);
appData.budgetMonth = budgetTotal[0];
appData.budgetDay = budgetTotal[1];
appData.period = appData.getTargetMonth(appData.mission, appData.budgetMonth);


console.log("Расходы за месяц " + appData.expensesMonth); // вывод расходов

if (appData.period > 0 ){
    console.log("Цель будет достигнута через " + appData.period + " месяцу / месяцев");
} else {
    console.log("Цель не будет достигнут ");
} // вывод периода

console.log("Бюджет на день: " + appData.budgetDay);
console.log(appData.getStatusIncome(appData.budgetDay)); // уровень дохода