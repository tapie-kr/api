import { writeFileSync } from 'fs';
import { join } from 'path';

const envFilePath = join(__dirname, '../packages/database/.env');
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL 환경 변수가 설정되지 않았습니다.');

  process.exit(1);
}

const envContent = `DATABASE_URL=${databaseUrl}\n`;

try {
  writeFileSync(envFilePath, envContent, { encoding: 'utf8' });
} catch (error) {
  console.error(`❌ .env 파일 생성 중 오류 발생: ${(error as Error).message}`);

  process.exit(1);
}
