// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract DailyExpenseContract {
    struct DailyExpense {
        uint256 id;
        string category;
        string description;
        uint256 amount;
        uint256 date;
    }

    mapping(uint256 => DailyExpense) public expenses;
    uint256 public nextId;

    event ExpenseCreated(uint256 indexed id, string category, string description, uint256 amount, uint256 date);
    event ExpenseUpdated(uint256 indexed id, string category, string description, uint256 amount, uint256 date);
    event ExpenseDeleted(uint256 indexed id);

    function createExpense(string memory _category, string memory _description, uint256 _amount, uint256 _date) public {
        uint256 id = nextId++;
        expenses[id] = DailyExpense(id, _category, _description, _amount, _date);
        emit ExpenseCreated(id, _category, _description, _amount, _date);
    }

    function getAllExpenses() public view returns (DailyExpense[] memory) {
        DailyExpense[] memory allExpenses = new DailyExpense[](nextId);
        for (uint256 i = 0; i < nextId; i++) {
            allExpenses[i] = expenses[i];
        }
        return allExpenses;
    }

    function getExpense(uint256 _id) public view returns (DailyExpense memory) {
        return expenses[_id];
    }

    function updateExpense(uint256 _id, string memory _category, string memory _description, uint256 _amount, uint256 _date) public {
        require(_id < nextId, "Expense does not exist");
        expenses[_id] = DailyExpense(_id, _category, _description, _amount, _date);
        emit ExpenseUpdated(_id, _category, _description, _amount, _date);
    }

    function deleteExpense(uint256 _id) public {
        require(_id < nextId, "Expense does not exist");
        delete expenses[_id];
        emit ExpenseDeleted(_id);
    }
}
