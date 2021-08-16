'use strict';

const calculate = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),
    plusButtons = document.getElementsByTagName("button"),
    plusButt = document.querySelectorAll(".btn_plus"),
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
    periodSelect = document.querySelector(".period-select"),
    warningElement = document.createElement("h3"),
    buttonText = document.querySelectorAll("[type=text]");

warningElement.innerHTML = "Поле Месячный доход пустое";
warningElement.classList.add("warning");



let expenseElements = document.querySelectorAll(".expenses-items"),
    incomeElements = document.querySelectorAll(".income-items"),
    titlePlaceHolder = document.querySelectorAll("[placeholder='Наименование']"),
    summPlaceHolder = document.querySelectorAll('[placeholder="Сумма"]'),
    constE = 0,
    constI = 0,
    counter = 0;

class AppData{
    constructor(){
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.incomeMonth = 0;
        this.addExpensesOnestring = "";
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.period = 0;
        this.budget = 0;
        this.budgetDay = 0; 
        this.budgetMonth = 0; 
        this.expensesMonth = 0; 
        this.moneyPeriod = 0;
    }

    start(){
        expensesPlus.style.display = "block";
        incomePlus.style.display = "block";
        if (salaryAmount.value !== "" ){
            appData.budget = salaryAmount.value;
            if (document.querySelector(".warning")){
                document.querySelectorAll(".warning").forEach(function(item){
                    item.remove();
                });
                document.querySelector(".salary-title").style.color = "green";
            }
        } else {
            counter++;
            if (counter<2){
            document.querySelector("h1").after(warningElement);
            document.querySelector(".salary-title").style.color = "red";
            } else {
                return 0;
            }
            return 0;
        }
        appData.getExpInc();
        appData.getExpensesIncomesMonth();
        appData.inputExpenseTitle();
        appData.getBudget();
        appData.getAddIncomeItem();
        appData.inputIncomeTitle();
        appData.calcMoney();
        appData.getTargetMonth();
        appData.showInvest();
        appData.showResult();
        appData.disableInput();
        return;
    }
    

    
    getExpInc(){
        expenseElements = document.querySelectorAll(".expenses-items");
        incomeElements = document.querySelectorAll(".income-items");
        
        const iterating = item => {
            const subStr = item.className.split("-")[0];
            const itemTitle = item.querySelector(`.${subStr}-title`).value,
                  itemAmmount = item.querySelector(`.${subStr}-amount`).value;
            if (itemTitle !== "" && itemAmmount !== ""){
                this[subStr][itemTitle.toString()] = itemAmmount;
            } 
        };
        expenseElements.forEach(iterating);
        incomeElements.forEach(iterating);
    }
    
    addExpIncBlock(event){
        let classes =event.target.classList;
        const newBlock = document.createElement("div");
        classes = classes[1].split("_")[0];
        newBlock.classList.add(classes + "-items");
        newBlock.innerHTML = `  
        <input type="text" class="${classes}-title" placeholder="Наименование">
        <input type="text" class="${classes}-amount" placeholder="Сумма">`;

        if (classes === "income"){  
            constI++;
            if (constI < 3){ 
                document.querySelector(`.${classes}`).append(newBlock);
                incomePlus.before(newBlock);  
            } else {
                incomePlus.style.display = "none";
            }

        } else if (classes === "expenses"){
            constE++;
            if (constE > 2){ 
                expensesPlus.style.display = "none";
            } else {
                document.querySelector(`.${classes}`).append(newBlock);
                expensesPlus.before(newBlock);  
            }
        }
    }
    

    getExpensesIncomesMonth(){
        const _this = this;
        let keys = Object.keys(this.income);
        for (let items in this.income){
            _this.incomeMonth += parseInt(_this.income[items], 10);
        }
        keys = Object.keys(this.expenses);
        for (let items of keys){
            _this.expensesMonth += parseInt(_this.expenses[items], 10);
        }
    }
    
    getBudget() {
        this.budgetMonth = parseInt(this.budget, 10) + this.incomeMonth - appData.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30); 
    }
    
    getTargetMonth() {
        this.period = Math.ceil(targetAmount.value / this.budgetMonth );
    }
    
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        targetMonthValue.value = this.period;
    }
    
    inputExpenseTitle() {
        const addExpensesItemTitle = function(){
            if (addExpensesItem.value !== ""){
            const keys = addExpensesItem.value.split(',');
            let str = "";
            for (const item of keys){
                item.trim();
                str += item[0].toUpperCase() + item.slice(1) + ", ";
            }
            return str;}
            else {
                return 'Пусто';
            }
        };
        addExpensesValue.value = addExpensesItemTitle();
    }
    
    inputIncomeTitle() {
        let titles = this.addIncome,
            substr = "";
        for (let item of titles){
            item = item[0].toUpperCase() + item.slice(1);
            substr += item +", ";
        }
        addIncomeValue.value = substr;
    }
    
    getAddIncomeItem() {
        addIncomeItem.forEach(function(item){
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        }
        );
    }
    
    showInvest() {
        this.getBudget();
        this.calcMoney();
        incomePeriodValue.value = this.moneyPeriod;
    }
    
    calcMoney() {
        this.moneyPeriod = this.budgetMonth * periodSelect.value;
    }
    
    reset() {
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.incomeMonth = 0;
        this.addExpensesOnestring = "";
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.period = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0; 
        this.moneyPeriod = 0;
        calculate.innerHTML = "Рассчитать";
    }
    
    setItemsDisabled() {
        buttonText.forEach(function(item){
            item.setAttribute("disabled", "");
        });
    }
    
    disableInput() {
        const _this = this;
        this.setItemsDisabled();
        expensesPlus.style.display = "none";
        incomePlus.style.display = "none";
        calculate.style.display = "none";
        cancel.style.display = "block";
    
        cancel.addEventListener("click", function reseter(){
            _this.reset();
            expensesPlus.style.display = "block";
            incomePlus.style.display = "block";
            calculate.style.display = "block";
            cancel.style.display = "none";
            buttonText.forEach(function(item){
                item.removeAttribute("disabled");
                item.value = "";
            });
        }, true);
        
        calculate.removeEventListener("click", function reseter(){
            appData.reset();
            buttonText.forEach(function(item){
                item.removeAttribute("disabled");
                item.value = "";
            });
        }, true);
    
    }
    
    addEventListeners() {
        calculate.addEventListener('click', appData.start);
        plusButt.forEach((item) => item.addEventListener('click', appData.addExpIncBlock));
        periodSelect.addEventListener('mousemove', function(){
            appData.showInvest();
            document.getElementsByClassName("period-amount")[0].innerHTML = periodSelect.value;
        });
    }

}


const appData = new AppData();
appData.addEventListeners();

