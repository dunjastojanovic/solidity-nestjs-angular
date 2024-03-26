import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { DailyExpenseService } from './daily-expense.service';
import { CreateExpenseDto } from './dto/create-daily-expense.dto';
import { Expense } from './model/daily-expense.model';
import { DailyExpense } from 'frontend/src/app/models/daily-expense';

@Controller('daily-expense')
export class DailyExpenseController {
  constructor(private readonly service: DailyExpenseService) {}

  @Get()
  async getAllExpenses(): Promise<Expense[]> {
    return this.service.getAllExpenses();
  }

  @Post()
  async createExpense(@Body() createExpenseDto: CreateExpenseDto): Promise<void> {
    await this.service.createExpense(createExpenseDto);   
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DailyExpense> {
    return this.service.getExpense(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDailyExpenseDto: CreateExpenseDto): Promise<void> {
    await this.service.updateExpense(id, updateDailyExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.deleteExpense(id);
  }
}
