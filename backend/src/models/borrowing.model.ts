import { RowDataPacket } from 'mysql2';

enum Status {
  borrowed = 'borrowed',
  returned = 'returned',
  late = 'late',
}
export interface Borrowing {
  id: number;
  members_id: number;
  books_detail_id: number;
  admins_id: number;
  borrow_date: Date;
  return_date: Date;
  status: Status;
}

export interface BorrowingQueryResult extends RowDataPacket {
  id: number;
  members_id: number;
  books_detail_id: number;
  admins_id: number;
  borrow_date: Date;
  return_date: Date;
  status: Status;
}
