// expense.model.ts
import mongoose, { Document } from 'mongoose';
import { ExpenseSchema } from '../schema/daily-expense.schema';
// import { ExpenseSchema } from './expense.schema';

export interface Expense extends Document {
  category: string;
  description: string;
  amount: number;
  date: number;
}

export const ExpenseModel = mongoose.model<Expense>('Expense', ExpenseSchema);