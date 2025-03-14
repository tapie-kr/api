import { describe, expect, it } from '@jest/globals';
import { PermissionCore, Permissions, PermissionSet } from '@/common/utils/permissions';

describe('Permissions', () => {
  describe('hasPermission', () => {
    it('should return true when user has the required permission', () => {
      const userPermissions = Permissions.DASHBOARD_ACCESS | Permissions.DESIGN_CLASS_ACCESS;

      expect(PermissionCore.hasPermission(userPermissions, Permissions.DASHBOARD_ACCESS)).toBe(true);

      expect(PermissionCore.hasPermission(userPermissions, Permissions.DESIGN_CLASS_ACCESS)).toBe(true);
    });

    it('should return false when user does not have the required permission', () => {
      const userPermissions = Permissions.DASHBOARD_ACCESS;

      expect(PermissionCore.hasPermission(userPermissions, Permissions.DESIGN_CLASS_ACCESS)).toBe(false);
    });
  });

  describe('grantPermission', () => {
    it('should add new permission to user permissions', () => {
      let userPermissions: number = PermissionSet.NONE;

      userPermissions = PermissionCore.grantPermission(userPermissions, Permissions.DASHBOARD_ACCESS);

      expect(PermissionCore.hasPermission(userPermissions, Permissions.DASHBOARD_ACCESS)).toBe(true);

      userPermissions = PermissionCore.grantPermission(userPermissions,
        Permissions.DESIGN_CLASS_ACCESS);

      expect(PermissionCore.hasPermission(userPermissions, Permissions.DESIGN_CLASS_ACCESS)).toBe(true);

      expect(PermissionCore.hasPermission(userPermissions, Permissions.DASHBOARD_ACCESS)).toBe(true);
    });
  });

  describe('revokePermission', () => {
    it('should remove permission from user permissions', () => {
      /*
       * DASHBOARD_ACCESS | DESIGN_CLASS_ACCESS
       */
      let userPermissions = Permissions.DESIGN_CLASS_ACCESS;

      userPermissions = PermissionCore.revokePermission(userPermissions,
        Permissions.DESIGN_CLASS_ACCESS);

      expect(PermissionCore.hasPermission(userPermissions, Permissions.DESIGN_CLASS_ACCESS)).toBe(false);

      expect(PermissionCore.hasPermission(userPermissions, Permissions.DASHBOARD_ACCESS)).toBe(true);
    });
  });

  describe('predefined permission sets', () => {
    it('should correctly set DESIGN_CLASS_STUDENT permissions', () => {
      const permissions = Permissions.DESIGN_CLASS_ACCESS;

      expect(PermissionCore.hasPermission(permissions, Permissions.DASHBOARD_ACCESS)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.DESIGN_CLASS_ACCESS)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.DESIGN_CLASS_MANAGE)).toBe(false);
    });

    it('should correctly set DEVELOPER_CLASS_STUDENT permissions', () => {
      const permissions = Permissions.DEVELOPER_CLASS_ACCESS;

      expect(PermissionCore.hasPermission(permissions, Permissions.DASHBOARD_ACCESS)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.DEVELOPER_CLASS_ACCESS)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.DEVELOPER_CLASS_MANAGE)).toBe(false);
    });

    it('should correctly set MODERATOR permissions', () => {
      const permissions = PermissionSet.MODERATOR;

      expect(PermissionCore.hasPermission(permissions, Permissions.DASHBOARD_ACCESS)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.DESIGN_CLASS_MANAGE)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.DEVELOPER_CLASS_MANAGE)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.ATTENDANCE_MANAGE)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.MEMBER_MANAGE)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.PORTFOLIO_MANAGE)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.AWARDS_MANAGE)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.ANNOUNCEMENT_READ)).toBe(true);

      expect(PermissionCore.hasPermission(permissions, Permissions.ANNOUNCEMENT_MANAGE)).toBe(true);
    });
  });
});
