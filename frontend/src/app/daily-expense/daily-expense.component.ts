import { Component, OnInit } from '@angular/core';
import { DailyExpenseService } from '../services/daily-expense.service';
import { DailyExpense } from '../models/daily-expense';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import exp from 'constants';

@Component({
  selector: 'app-daily-expense',
  templateUrl: './daily-expense.component.html',
  styleUrl: './daily-expense.component.scss'
})
export class DailyExpenseComponent implements OnInit{

  public dailyExpenses: DailyExpense[] = [];
  public dailyExpenseForm: FormGroup;
  public editMode = false;
  public dailyExpense: DailyExpense;
  constructor(private readonly service: DailyExpenseService, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dailyExpenseForm = this.formBuilder.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.getAll();
  }

  /**
   * List of all expenses
   */
  public async getAll(): Promise<void> {
    this.service.getAll().subscribe((response: DailyExpense[]) => {
      this.dailyExpenses = response
    })
  }

  /**
   * 
   * @param data 
   * Saving expense based on form data
   */
  public async save(data: DailyExpense): Promise<void> {
    data.date = Date.parse((data.date).toString());
    this.service.save(data).subscribe(response => {
      this.getAll();
      this.closeModal();
    })
  }

  public async delete(id: number): Promise<void> {
    this.service.delete(id).subscribe(response => {
      this.getAll();
    })
  }

  public async update(id: number, data: DailyExpense): Promise<void> {
    data.date = Date.parse((data.date).toString());
    this.service.update(id, data).subscribe(response => {
      this.getAll();
      this.closeModal();
      this.editMode = false;
    })
  }

  public edit(id: number) {
    this.editMode = true;
    this.dailyExpense = this.dailyExpenses.find(expense => expense.id === id) as DailyExpense;
    
    if( this.dailyExpense) {
      const formattedDate = this.formatDate(new Date( this.dailyExpense.date));

      this.dailyExpenseForm.patchValue({
        category:  this.dailyExpense?.category,
        description:  this.dailyExpense?.description,
        amount:  this.dailyExpense?.amount,
        date: formattedDate
      });
    }
  }

  /**
   * private method to close modal after submitting a post request
   */
  private closeModal(): void {
    const closeButton = document.getElementById('button-close')as HTMLElement;
    closeButton.click()
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
