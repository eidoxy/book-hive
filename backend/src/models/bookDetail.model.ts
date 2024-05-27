import { RowDataPacket } from 'mysql2';

export interface BookDetail {
  id: number;
  books_id: number;
  authors_id: number;
  publishers_id: number;
  published_date: Date;
  isbn: string;
}

export interface BookDetailQueryResult extends RowDataPacket {
  id: number;
  books_id: number;
  authors_id: number;
  publishers_id: number;
  published_date: Date;
  isbn: string;
}
