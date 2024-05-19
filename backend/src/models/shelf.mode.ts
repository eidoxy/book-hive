import { RowDataPacket } from 'mysql2';

export interface Shelf {
  id: number;
  name: string;
  description: string;
}

export interface ShelfQueryResult extends RowDataPacket {
  id: number;
  name: string;
  description: string;
}
