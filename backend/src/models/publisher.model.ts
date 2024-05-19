import { RowDataPacket } from 'mysql2';

export interface Publisher {
  id: number;
  name: string;
}

export interface PublisherQueryResult extends RowDataPacket {
  id: number;
  name: string;
}
