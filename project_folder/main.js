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
                let expenseName = prompt("Введите обязательную статью расходов 2?");

                do {
                    answer = parseInt(prompt("Во сколько это обойдется?"), 10);
            
                } while (isNaN(answer));

                appData.expenses[expenseName] = answer;
                console.log(appData.expenses);
                return;
            }
        while (index < 2) {
            getExpenses();
            index ++;
        }    
    },
    budget: start(),
    budgetDay: 0, //задаём через функцию
    budgetMonth: 0, //задаём через функцию
    expensesMonth: 0, //задаём через функцию
    getExpensesMonth: function (expense1, expense2) {
        appData.expensesMonth = expense1 + expense2;
    },
    getBudget: function (income, expense) {
        appData.budgetMonth = income - expense;
        appData.budgetDay = appData.budgetMonth / 30; 
    },
    getTargetMonth: function (scope, accumulated){
        appData.period= Math.ceil(scope/accumulated);
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

appData.getExpensesMonth(firstExpense, secondExpense);
appData.getBudget(appData.budget, appData.expensesMonth);
appData.getTargetMonth(appData.mission, appData.budgetMonth);

console.log("Расходы за месяц " + appData.expensesMonth); // вывод расходов

if (appData.period > 0 ){
    console.log("Цель будет достигнута через " + appData.period + " месяцу / месяцев");
} else {
    console.log("Цель не будет достигнут ");
} // вывод периода

console.log("Бюджет на день: " + appData.budgetDay);
console.log(appData.getStatusIncome(appData.budgetDay)); // уровень дохода

for (let key in appData) {
    console.log(key + " : " + appData[key]);
}