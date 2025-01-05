import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'

@Module({ imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env'],
  }),
  CacheModule.register({ isGlobal: true }),
] })
export class AppModule {}
