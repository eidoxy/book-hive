import { RowDataPacket } from 'mysql2';

export interface Visit {
  id: number;
  member_id: number;
  date: string;
}

export interface VisitQueryResult extends RowDataPacket {
  id: number;
  member_id: number;
  date: string;
}
