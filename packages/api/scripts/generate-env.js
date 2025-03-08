const fs = require('fs');
const path = require('path');
const envFilePath = path.join(__dirname, '../packages/database/.env');
const databaseUrl = process.env.DATABASE_URL;

console.log(databaseUrl);

if (!databaseUrl) {
  console.error('❌ DATABASE_URL 환경 변수가 설정되지 않았습니다.');

  process.exit(1);
}

const envContent = `DATABASE_URL=${databaseUrl}\n`;

try {
  fs.writeFileSync(envFilePath, envContent, { encoding: 'utf8' });
} catch (error) {
  console.error(`❌ .env 파일 생성 중 오류 발생: ${error.message}`);

  process.exit(1);
}
