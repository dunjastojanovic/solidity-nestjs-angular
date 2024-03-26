export class CreateExpenseDto {
    readonly category: string;
    readonly description: string;
    readonly amount: number;
    readonly date: number;
}