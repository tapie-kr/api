import { MemberRole, MemberUnit } from '@tapie-kr/api-database';

export class CreateMemberPrismaDto {
  googleEmail: string;
  name:        string;
  role:        MemberRole;
  unit:        MemberUnit;
  username?:   string;
}

