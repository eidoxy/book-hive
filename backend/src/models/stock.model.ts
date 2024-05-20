import { RowDataPacket } from 'mysql2';

export interface Stock {
  id: number;
  quantity: number;
}

export interface StockQueryResult extends RowDataPacket {
  id: number;
  quantity: number;
}
