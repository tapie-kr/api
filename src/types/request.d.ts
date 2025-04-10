import { Account, Permission } from '@prisma/client';
import { Request } from 'express';

export interface AuthorizedRequest extends Request {
	account: Account & {
		permission: Permission | null;
	};
}
