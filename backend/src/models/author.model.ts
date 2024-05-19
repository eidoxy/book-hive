import { RowDataPacket } from 'mysql2';

export interface Author {
  id: number;
  name: string;
}

export interface AuthorQueryResult extends RowDataPacket {
  id: number;
  name: string;
}
