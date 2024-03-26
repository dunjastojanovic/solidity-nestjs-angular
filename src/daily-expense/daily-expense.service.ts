import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import * as DailyExpenseContract from '../../build/contracts/DailyExpenseContract.json'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './model/daily-expense.model';
import { CreateExpenseDto } from './dto/create-daily-expense.dto';

@Injectable()
export class DailyExpenseService {
  private web3: Web3;
  private contract: any;
  
  constructor(@InjectModel('Expense') private readonly expenseModel: Model<Expense>) {
    this.web3 = new Web3('http://127.0.0.1:7545'); // Local Ganache connection url
    this.initializeContract();
  }

  /** @important 
   * Handled BigInt values in all of methods below!!!!
   * 
   * 

  /**
   * Initializing connection to local Ganache instance (development purpose)
   */
  private async initializeContract(): Promise<void> {
    try {
      const accounts = await this.web3.eth.getAccounts();
      const contractAddress = DailyExpenseContract.networks[5777].address;
      const contractAbi = DailyExpenseContract.abi;
      this.contract = new this.web3.eth.Contract(contractAbi, contractAddress, { from: accounts[0] });
    } catch (error) {
      console.error('Error initializing contract:', error);
    }
  }

  /**
   * 
   * @param data 
   * Creating new record
   */

  async createExpense(data: CreateExpenseDto): Promise<void> {
    try {
      const createdExpense = new this.expenseModel({category: data.category, description: data.description, amount: data.amount, date: data.date});
      await createdExpense.save();

      const accounts = await this.web3.eth.getAccounts();
      await this.contract.methods.createExpense(data.category, data.description, data.amount, data.date)
        .send({ from: accounts[0], gas:'1000000' });
    } catch (error) {
      throw error;
    }
  }

   /**
   * 
   * Fetching all records
   */
  async getAllExpenses(): Promise<Expense[]> {
    try {
      const accounts = await this.web3.eth.getAccounts();
      const response = await this.contract.methods.getAllExpenses().call({ from: accounts[0], gas:'1000000' });

      const expenses = response.map((expense: any) => ({
        id: expense.id.toString(),
        category: expense.category,
        description: expense.description,
        amount: expense.amount.toString(),
        date: expense.date.toString(),
    }));

    const filteredExpenses = expenses.filter(expense => 
      expense.id !== "0" && 
      expense.category !== "" && 
      expense.description !== "" && 
      expense.amount !== "0" && 
      expense.date !== "0"
  );
      return filteredExpenses;
    } catch (error) {
      console.error('Error getting all expenses:', error);
      throw error;
    }
  }

   /**
   * 
   * @param id 
   * Fetching record by id
   */

  async getExpense(id: number): Promise<any> {
    try {
      const accounts = await this.web3.eth.getAccounts();
      const response = await this.contract.methods.getExpense(id).call({from: accounts[0], gas:'1000000' });

      const expense = {
        id: response.id.toString(),
        category: response.category,
        description: response.description,
        amount: response.amount.toString(),
        date: response.date.toString(),
      }

      return expense;
    } catch(error) {
      throw error;
    }
    
  }

   /**
   * 
   * @param id 
   * Updating record
   */

  async updateExpense(id: number, data: CreateExpenseDto): Promise<void> {
    try {
      const accounts = await this.web3.eth.getAccounts();
      console.log("DATA: ", [id, data])
      await this.contract.methods.updateExpense(id.toString(), data.category, data.description, data.amount.toString(), data.date.toString()).send({ from: accounts[0] });
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
  }

  /**
   * 
   * @param id 
   * Deleting record by id
   */
  async deleteExpense(id: number): Promise<void> {
    const accounts = await this.web3.eth.getAccounts();
    await this.contract.methods.deleteExpense(id).send({ from: accounts[0], gas: '1000000' });
  }
}
