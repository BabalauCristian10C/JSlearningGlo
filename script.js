'use strict';

const calculate = document.querySelector('#start'),
    plusButtons = document.getElementsByTagName("button"),
    incomePlus = plusButtons[0],
    expensesPlus = plusButtons[1],
    checkBox = document.getElementById("deposit-check"),
    addIncomeItem = document.querySelectorAll(".additional_income-item"),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    salaryAmount = document.querySelector(".salary-amount"),
    incomeTitle = document.querySelector(".income-title"),
    incomeAmmount = document.querySelector(".income-amount"),
    expensesTitle = document.querySelector(".expenses-title"),
    expensesAmount = document.querySelector(".expenses-amount"),
    addExpensesItem = document.querySelector(".additional_expenses-item"),
    depositCheck = document.querySelector("#deposit-check"),
    selector = document.querySelector(".deposit-bank"),
    depositAmount = document.querySelector(".deposit-amount"),
    targetAmount = document.querySelector(".target-amount"),
    range = document.querySelector('[type="range"]'),
    periodSelect = document.querySelector(".period-select");
    

let expenseElements = document.querySelectorAll(".expenses-items"),
    incomeElements = document.querySelectorAll(".income-items"),
    constE = 0,
    constI = 0;


let appData = {
    income: {},
    addIncome: [],
    expenses: {}, //задаём через функцию
    addExpenses: [],
    incomeMonth:0 ,
    addExpensesOnestring: "",
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 0, //задаём через функцию
    start: function (event){
        if (salaryAmount.value !== ""){
            appData.budget = salaryAmount.value;
            if (document.querySelector(".warning")){
                document.querySelectorAll(".warning").forEach(function(item){
                    item.remove();
                });
                document.querySelector(".salary-title").style.color = "green";
            }
        } else {
            event.preventDefault();
            document.querySelector("h1").insertAdjacentHTML("afterend",`<h3 class = "warning" style = "text-align:center; color:red"> Поле Месячный доход пустое</h3>`);
            
            document.querySelector(".salary-title").style.color = "red";
            alert("Salary Amount field is empty");
        }
        // appData.getInfoDeposit();
        appData.getExpensesTemp();
        appData.getExpensesMonth();
        appData.getIncomeTemp();
        appData.getIncomeMonth();
        appData.inputExpenseTitle();
        appData.getBudget();
        appData.getAddIncomeItem();
        appData.inputIncomeTitle();
        appData.calcMoney();
        appData.getTargetMonth();
        appData.showInvest();
        appData.showResult();
        
        return;
    },
    addExpensesBlock: function(){
        const newExpenseBlock = document.createElement("div");
        newExpenseBlock.classList.add("expenses-items");
        newExpenseBlock.innerHTML = `  
        <input type="text" class="expenses-title" placeholder="Наименование">
        <input type="text" class="expenses-amount" placeholder="Сумма">`;
        document.querySelector('.expenses').append(newExpenseBlock);
        constE++;
        if (constE === 2){
            expensesPlus.style.display = "none";
        }
        expensesPlus.before(newExpenseBlock);  
        
    },
    getExpensesTemp:function(){
        expenseElements = document.querySelectorAll(".expenses-items");
        expenseElements.forEach(function(item,i){
            const expTitle = item.querySelector('.expenses-title').value,
                  expAmm = item.querySelector('.expenses-amount').value;
            if (expTitle !== "" && expAmm !== ""){
                appData.expenses[expTitle.toString()] = expAmm;
            } 
        }
        );
    },
    getIncomeTemp:function(){
        incomeElements = document.querySelectorAll(".income-items");
        incomeElements.forEach(function(item){
            const incTitle = item.querySelector('.income-title').value,
                  incAmm = item.querySelector('.income-amount').value;
            if (incTitle !== "" && incAmm !== ""){
                appData.income[incTitle.toString()] = incAmm;
            } 
        }
        );
    },
    addIncomeBlock: function(){
        const newExpenseBlock = document.createElement("div");
        newExpenseBlock.classList.add("income-items");
        newExpenseBlock.innerHTML = `
        <input type="text" class="income-title" placeholder="Наименование">
        <input type="text" class="income-amount" placeholder="Сумма">`;
        document.querySelector('.income').append(newExpenseBlock);
        incomePlus.before(newExpenseBlock);  
        constI++;
        if (constI === 2){
            incomePlus.style.display = "none";
        }
    },
    asking: function(){
        let addExpense = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "не важно");
        appData.addExpenses = addExpense.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит?');  
    },
    budget: 0,
    budgetDay: 0, 
    budgetMonth: 0, 
    expensesMonth: 0, 
    moneyPeriod: 0,
    getExpensesMonth: function () {
        const keys = Object.keys(appData.expenses);
        for (let item of keys){
            appData.expensesMonth += parseInt(appData.expenses[item], 10);
        }
    },
    getIncomeMonth: function(){
        const keys = Object.keys(appData.income);
        for (let item of keys){
            appData.incomeMonth += parseInt(appData.income[item], 10);
        }
    },
    getBudget: function () {
        appData.budgetMonth = parseInt(appData.budget, 10) + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30); 
    },
    getTargetMonth: function (){
        appData.period = Math.ceil( targetAmount.value / appData.budgetMonth );
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
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        targetMonthValue.value = appData.period;

    },
    inputExpenseTitle: function(){
        const addExpensesItemTitle = function(){
            if (addExpensesItem.value !== ""){
            const keys = addExpensesItem.value.split(',');
            let str = "";
            for (let item of keys){
                item.trim();
                str += item[0].toUpperCase() + item.slice(1) + ", ";
            }
            return str;}
            else {
                return 'Пусто';
            }
        };
        addExpensesValue.value = addExpensesItemTitle();
    },
    inputIncomeTitle: function(){
        let titles = appData.addIncome,
            substr = "";
        for (let item of titles){
            item = item[0].toUpperCase() + item.slice(1);
            substr += item +", ";
        }
        addIncomeValue.value = substr;
    },
    getAddIncomeItem: function(){
        addIncomeItem.forEach(function(item){
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        }
        );
    },
    showInvest:function(){
        appData.getBudget();
        appData.calcMoney();
        incomePeriodValue.value = appData.moneyPeriod;
        console.log(appData.moneyPeriod);
    },
    calcMoney: function(){
        appData.moneyPeriod = appData.budgetMonth * periodSelect.value;
    }
};

// добавил пару переменых для более лёгкого обращения к этим элементам надеюсь ничего страшного

calculate.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('mousemove', function(){
    appData.showInvest();
    document.getElementsByClassName("period-amount")[0].innerHTML = periodSelect.value;
});



if (appData.period > 0 ){
    console.log("Цель будет достигнута через " + appData.period + " месяцу / месяцев");
} else {
    console.log("Цель не будет достигнут ");
} // вывод периода


appData.addExpenses.forEach(function(item,i){
    appData.addExpensesOnestring += item.charAt(0).toUpperCase() + item.slice(1) + ", ";
});
console.log(appData.addExpensesOnestring);