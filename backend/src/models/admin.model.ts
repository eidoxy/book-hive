import { RowDataPacket } from 'mysql2';

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  request_token: string;
}

export interface AdminQueryResult extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  request_token: string;
}
