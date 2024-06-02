enum Status {
  borrowed = 'borrowed',
  returned = 'returned',
  late = 'late',
}
export interface Borrowing {
  id?: number;
  member: number;
  book: number;
  admin: number;
  borrow_date: string;
  return_date: string;
  status: Status;
}
