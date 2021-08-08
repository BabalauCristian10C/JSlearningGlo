'use strict';


const start = function (){
    let moneyMonth;
    do {
        moneyMonth = parseInt(prompt("Ваш месячный доход?", '30000'), 10 );
    } while(isNaN(moneyMonth));
    return moneyMonth;
};

let appData = {
    income: {},
    addIncome: [],
    expenses: {}, //задаём через функцию
    addExpenses: [],
    addExpensesOnestring: "",
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0 ,
    mission: 45000,
    period: 0, //задаём через функцию
    asking: function(){
        let itemIncome,
            cashIncome;
        if(confirm("Есть ли у вас доп заработки?")){
            do {
                itemIncome = prompt("какой ваш доп заработок", "работа");
                console.log(itemIncome, +itemIncome, itemIncome == +itemIncome)
            } while (parseInt(itemIncome, 10) == itemIncome);
            do{
                cashIncome = +prompt("сколько вы на этом зарабатываете", 10);
            } while (isNaN(cashIncome));    
            appData.income[itemIncome] = cashIncome;
        }
        let addExpense = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "не важно");
        appData.addExpenses = addExpense.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит?');  
    },
    getExpenses: function () {
        let expenseName,
            answer;
        do{
            expenseName = prompt("Введите обязательную статью расходов ?" , "жрачка");
        } while (parseInt(expenseName, 10) == expenseName);
        do {
            answer = parseInt(prompt("Во сколько это обойдется?", 1000), 10);
        } while (isNaN(answer));
        appData.expenses[expenseName] = answer;
    },
    budget: start(),
    budgetDay: 0, //задаём через функцию
    budgetMonth: 0, //задаём через функцию
    expensesMonth: 0, //задаём через функцию
    getExpensesMonth: function (expense1, expense2) {
        appData.expensesMonth = Object.values(appData.expenses)[0] + Object.values(appData.expenses)[1];
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30; 
    },
    getTargetMonth: function (){
        appData.period= Math.ceil(appData.mission/appData.budgetMonth);
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 1200) {
            return "У вас высокий уровень дохода";
        } else if (appData.budgetDay>600 && appData.budgetDay<1200 ) {
            return "У вас средний уровень дохода";
        } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else {
            return "что то пошло не так";
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do {
            appData.percentDeposit = parseInt(prompt("каков процент вашего депозита", 5), 10);
            } while (isNaN(appData.percentDeposit));
            do {
            appData.moneyDeposit = parseInt(prompt("сколько денег на вашем депозитном счету", 5000), 10);
            } while (isNaN(appData.moneyDeposit));
        }
    },
    calcMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

// добавил пару переменых для более лёгкого обращения к этим элементам надеюсь ничего страшного

appData.asking(); // узнаёт расходы
appData.getExpenses();
appData.getExpenses();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();

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

appData.addExpenses.forEach(function(item,i){
    appData.addExpensesOnestring += item.charAt(0).toUpperCase() + item.slice(1) + ", ";
});
console.log(appData.addExpensesOnestring);