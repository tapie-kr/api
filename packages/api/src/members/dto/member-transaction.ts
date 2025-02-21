import { MemberRole, MemberUnit } from '@tapie-kr/api-database';

export interface CreateMemberPrismaDto {
  googleEmail: string;
  name:        string;
  role:        MemberRole;
  unit:        MemberUnit;
  username?:   string;
}

