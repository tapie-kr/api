import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageService } from './storage.service';

@Module({
	providers: [StorageService, ConfigService],
	exports: [StorageService],
})
export class StorageModule {}
