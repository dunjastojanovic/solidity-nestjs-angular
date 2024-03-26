import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyExpenseComponent } from './daily-expense/daily-expense.component';

const routes: Routes = [
  {path: 'daily-expense', component: DailyExpenseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
