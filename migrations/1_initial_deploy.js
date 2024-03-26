const DailyExpense = artifacts.require('DailyExpenseContract');

module.exports = function(deployer) {
    deployer.deploy(DailyExpense)
}