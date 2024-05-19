import { RowDataPacket } from 'mysql2';

export interface Borrowing {
  id: number;
  members_id: number;
  book_details_id: number;
  admins_id: number;
  borrow_date: Date;
  return_date: Date;
  status: string;
}

export interface BorrowingQueryResult extends RowDataPacket {
  id: number;
  members_id: number;
  book_details_id: number;
  admins_id: number;
  borrow_date: Date;
  return_date: Date;
  status: string;
}
