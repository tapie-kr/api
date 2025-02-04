export class Permissions {
  static readonly NONE = 0;

  static readonly PERMISSIONS = {
    DASHBOARD_ACCESS: 1 << 0,
    DESIGN_CLASS_ACCESS: 1 << 1,
    DESIGN_CLASS_MANAGE: 1 << 2,
    DEVELOPER_CLASS_ACCESS: 1 << 3,
    DEVELOPER_CLASS_MANAGE: 1 << 4,
    ATTENDANCE_MANAGE: 1 << 5,
    MEMBER_MANAGE: 1 << 6,
    PORTFOLIO_MANAGE: 1 << 7,
    AWARDS_MANAGE: 1 << 8,
    ANNOUNCEMENT_READ: 1 << 9,
    ANNOUNCEMENT_MANAGE: 1 << 10,
  } as const;

  static readonly PERMISSION_SETS = {
    DESIGN_CLASS_STUDENT: this.PERMISSIONS.DASHBOARD_ACCESS | this.PERMISSIONS.DESIGN_CLASS_ACCESS,
    DEVELOPER_CLASS_STUDENT:
      this.PERMISSIONS.DASHBOARD_ACCESS | this.PERMISSIONS.DEVELOPER_CLASS_ACCESS,
    MODERATOR:
      this.PERMISSIONS.DASHBOARD_ACCESS |
      this.PERMISSIONS.DESIGN_CLASS_MANAGE |
      this.PERMISSIONS.DEVELOPER_CLASS_MANAGE |
      this.PERMISSIONS.ATTENDANCE_MANAGE |
      this.PERMISSIONS.MEMBER_MANAGE |
      this.PERMISSIONS.PORTFOLIO_MANAGE |
      this.PERMISSIONS.AWARDS_MANAGE |
      this.PERMISSIONS.ANNOUNCEMENT_READ |
      this.PERMISSIONS.ANNOUNCEMENT_MANAGE,
  } as const;

  static hasPermission(userPermissions: number, permission: number): boolean {
    return (userPermissions & permission) === permission;
  }

  static grantPermission(userPermissions: number, permission: number): number {
    return userPermissions | permission;
  }

  static revokePermission(userPermissions: number, permission: number): number {
    return userPermissions & ~permission;
  }

  static getPermissionList(userPermissions: number): string[] {
    return Object.entries(this.PERMISSIONS)
      .filter(([_, permission]) => this.hasPermission(userPermissions, permission))
      .map(([name]) => name);
  }

  static getAllPermissionNames(): string[] {
    return Object.keys(this.PERMISSIONS);
  }
}

// 타입 추출
export type Permission = keyof typeof Permissions.PERMISSIONS;
export type PermissionSet = keyof typeof Permissions.PERMISSION_SETS;
