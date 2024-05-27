enum MemberType {
  mahasiswa = 'siswa',
  dosen = 'dosen',
}
export interface Member {
  id?: number;
  name: string;
  email: string;
  password: string;
  member_type: MemberType;
  parent_number: string;
  phone: string;
  address: string;
  major: string;
  department: string;
}
