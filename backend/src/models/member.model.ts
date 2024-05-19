import { RowDataPacket } from 'mysql2';

export interface Member {
  id: number;
  name: string;
  email: string;
  password: string;
  member_type: string;
  parent_number: string;
  phone: string;
  address: string;
  major: string;
  department: string;
  request_token: string;
}

export interface MemberQueryResult extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  member_type: string;
  parent_number: string;
  phone: string;
  address: string;
  major: string;
  department: string;
  request_token: string;
}
