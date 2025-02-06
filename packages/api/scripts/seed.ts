/// <reference types="dotenv" />

import { PrismaClientKnownRequestError } from '@database/client/runtime/library';
import { MemberRole, MemberUnit, PrismaClient } from '@tapie-kr/api-database';
import { createLogger, format, transports } from 'winston';

import 'dotenv/config';

async function main() {
  const prisma = new PrismaClient;

  const logger = createLogger({
    format: format.combine(format.timestamp(),
      format.json()),
    transports: [transports.Console],
  });

  try {
    await prisma.$connect();

    const TEMPORARY_GOOGLE_EMAIL = process.env.TEMPORARY_GOOGLE_EMAIL;

    if (!TEMPORARY_GOOGLE_EMAIL) {
      console.error('TEMPORARY_GOOGLE_EMAIL을 환경변수로 설정해주세요.');

      return;
    }

    await prisma.member.create({ data: {
      googleEmail: TEMPORARY_GOOGLE_EMAIL,
      name:        '임시 사용자',
      role:        MemberRole.MANAGER,
      unit:        MemberUnit.DEVELOPER,
    } });

    logger.info('임시 사용자가 생성되었습니다.');
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('이미 같은 정보의 임시 사용자가 생성되어 있습니다.');
    } else {
      console.error(error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().then();
