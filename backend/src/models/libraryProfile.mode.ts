import { RowDataPacket } from 'mysql2';

export interface LibraryProfile {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  year_established: Date;
}

export interface LibraryProfileQueryResult extends RowDataPacket {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  year_established: Date;
}
