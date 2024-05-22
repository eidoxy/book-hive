import { RowDataPacket } from 'mysql2';

enum MemberType {
  mahasiswa = 'siswa',
  dosen = 'dosen',
}
export interface Member {
  id: number;
  name: string;
  email: string;
  password: string;
  member_type: MemberType;
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
