import { MemberRole, MemberUnit } from '@tapie-kr/api-database';

export interface CreateMemberDto {
  googleEmail: string;
  name:        string;
  role:        MemberRole;
  unit:        MemberUnit;
  username?:   string;
}

