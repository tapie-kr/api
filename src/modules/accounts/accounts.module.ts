import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccountsService } from './accounts.service';
import { AccountDetailController } from './controllers/account-detail.controller';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsRepository } from './repositories/accounts.repository';

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [AccountsController, AccountDetailController],
	providers: [AccountsService, AccountsRepository],
	exports: [AccountsService],
})
export class AccountsModule {}
