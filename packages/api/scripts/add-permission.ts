/* eslint-disable */
/// <reference types="dotenv" />

import { createLogger, format, transports } from 'winston';
import { MemberRole, MemberUnit, PrismaClient } from '../../database';
import { PrismaClientKnownRequestError } from '../../database/client/runtime/library';
import { PermissionCore, Permissions, PermissionSet } from '../src/common/utils/permissions';

import 'dotenv/config';
import * as readline from 'node:readline';

async function selectPermissions(): Promise<number> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise<number>((resolve) => {
    console.log('\n=== 권한 선택 메뉴 ===');
    console.log('1. 개별 권한 선택');
    console.log('2. 권한 세트 선택');
    console.log('3. 혼합 선택 (개별 권한 + 권한 세트)');

    rl.question('\n메뉴를 선택하세요 (1-3): ', async (answer) => {
      let selectedPermissions = 0;

      switch (answer) {
        case '1':
          selectedPermissions = await selectIndividualPermissions();
          break;
        case '2':
          selectedPermissions = await selectPermissionSets();
          break;
        case '3':
          selectedPermissions = await selectMixedPermissions();
          break;
        default:
          console.log('잘못된 선택입니다.');
      }

      rl.close();
      resolve(selectedPermissions);
    });
  });
}

async function selectIndividualPermissions(): Promise<number> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise<number>((resolve) => {
    const permissionEntries = Object.entries(Permissions);
    let selectedPermissions = 0;

    console.log('\n=== 사용 가능한 권한 목록 ===');
    permissionEntries.forEach(([name, value], index) => {
      console.log(`${index + 1}. ${name}`);
    });

    rl.question('\n권한 번호를 선택하세요 (여러 개는 쉼표로 구분, 예: 1,3,5): ', (answer) => {
      const selectedIndexes = answer.split(',').map(n => parseInt(n.trim()) - 1);
      selectedIndexes.forEach(index => {
        if (index >= 0 && index < permissionEntries.length) {
          selectedPermissions = PermissionCore.grantPermission(
            selectedPermissions,
            permissionEntries[index][1]
          );
        }
      });

      rl.close();
      resolve(selectedPermissions);
    });
  });
}

async function selectPermissionSets(): Promise<number> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise<number>((resolve) => {
    const permissionSetEntries = Object.entries(PermissionSet);
    let selectedPermissions = 0;

    console.log('\n=== 사용 가능한 권한 세트 목록 ===');
    permissionSetEntries.forEach(([name, value], index) => {
      console.log(`${index + 1}. ${name}`);
    });

    rl.question('\n권한 세트 번호를 선택하세요 (여러 개는 쉼표로 구분, 예: 1,2): ', (answer) => {
      const selectedIndexes = answer.split(',').map(n => parseInt(n.trim()) - 1);
      selectedIndexes.forEach(index => {
        if (index >= 0 && index < permissionSetEntries.length) {
          selectedPermissions = PermissionCore.grantPermission(
            selectedPermissions,
            permissionSetEntries[index][1]
          );
        }
      });

      rl.close();
      resolve(selectedPermissions);
    });
  });
}

async function selectMixedPermissions(): Promise<number> {
  const permissions = await selectIndividualPermissions();
  const setPermissions = await selectPermissionSets();
  return permissions | setPermissions;
}

async function main() {
  const prisma = new PrismaClient;

  const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports: [new transports.Console],
  });

  try {
    await prisma.$connect();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('권한을 추가할 사용자의 Google 이메일을 입력해주세요: ', async (email) => {
      const member = await prisma.member.findFirst({ where: { googleEmail: email } });

      if (!member) {
        console.error('해당 이메일을 가진 사용자를 찾을 수 없습니다.');
        await prisma.$disconnect();
        return;
      }

      const selectedPermissions = await selectPermissions();

      // 현재 권한에 새로운 권한 추가
      const updatedPermissions = PermissionCore.grantPermission(
        member.permissions || 0,
        selectedPermissions
      );

      await prisma.member.update({
        where: { uuid: member.uuid },
        data: { permissions: updatedPermissions }
      });

      const permissionList = PermissionCore.getPermissionList(updatedPermissions);
      logger.info('사용자 권한이 업데이트되었습니다.', {
        email: member.googleEmail,
        permissions: permissionList
      });

      await prisma.$disconnect();
      process.exit(0);
    });

  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('데이터베이스 오류가 발생했습니다.');
      logger.error('Database error', { error });
    } else {
      console.error(error);
      logger.error('Unknown error', { error });
    }
    await prisma.$disconnect();
    process.exit(1);
  }
}

main().then();