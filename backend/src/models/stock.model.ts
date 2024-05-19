import { RowDataPacket } from 'mysql2';

export interface Stock {
  id: number;
  amount: number;
}

export interface StockQueryResult extends RowDataPacket {
  id: number;
  amount: number;
}
