import { RowDataPacket } from 'mysql2';

export interface Book {
  id: number;
  title: string;
  cover: string;
  description: string;
  categories_id: number;
  shelfs_id: number;
  total_pages: number;
}

export interface BookQueryResult extends RowDataPacket {
  id: number;
  title: string;
  cover: string;
  description: string;
  categories_id: number;
  shelfs_id: number;
  total_pages: number;
}
