import { RowDataPacket } from 'mysql2';

export interface Category {
  id: number;
  name: string;
}

export interface CategoryQueryResult extends RowDataPacket {
  id: number;
  name: string;
}
