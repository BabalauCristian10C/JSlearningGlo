let money = 15000, income = "Stock Market", addExpenses = "Теннис, Курсы, Еда", deposit = true, mission = 30000;
let period = 1 , budgetDay = money/30;
let randArr = [money,income,addExpenses,deposit,mission,period];
//              0      1        2           3         4   5
//with convenience purposes
console.log(typeof randArr[0] + ' ' + typeof randArr[1] + ' ' + typeof randArr[3]);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцу \n"  + "Цель заработать " + mission + " колумбийских песо");
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);
