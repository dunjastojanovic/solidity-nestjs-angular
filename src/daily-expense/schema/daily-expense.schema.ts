// expense.schema.ts
import * as mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema({
  id: {type: Number, require: true},
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
});