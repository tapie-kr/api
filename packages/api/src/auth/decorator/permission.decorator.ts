import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (...permissions: number[]) => {
  const permissionBits = permissions.reduce((acc, curr) => acc | curr, 0);

  return SetMetadata(PERMISSIONS_KEY, permissionBits);
};
