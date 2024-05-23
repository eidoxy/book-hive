import { RowDataPacket } from 'mysql2';

export interface Stock {
  id: number;
  books_id: number;
  quantity: number;
}

export interface StockQueryResult extends RowDataPacket {
  id: number;
  books_id: number;
  quantity: number;
}
