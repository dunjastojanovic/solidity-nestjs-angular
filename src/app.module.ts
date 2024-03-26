import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyExpenseService } from './daily-expense/daily-expense.service';
import { DailyExpenseController } from './daily-expense/daily-expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyExpenseModule } from './daily-expense/daily-expense.module';
import { ExpenseSchema } from './daily-expense/schema/daily-expense.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/daily-expense'),
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
    DailyExpenseModule,
  ],
  controllers: [AppController, DailyExpenseController],
  providers: [AppService, DailyExpenseService],
})
export class AppModule {}
