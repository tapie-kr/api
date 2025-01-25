export class Permissions {
  static NONE = 0;
  static DASHBOARD_ACCESS = 1 << 0;
  static DESIGN_CLASS_ACCESS = 1 << 1;
  static DESIGN_CLASS_MANAGE = 1 << 2;
  static DEVELOPER_CLASS_ACCESS = 1 << 3;
  static DEVELOPER_CLASS_MANAGE = 1 << 4;
  static ATTENDANCE_MANAGE = 1 << 5;
  static MEMBER_MANAGE = 1 << 6;
  static PORTFOLIO_MANAGE = 1 << 7;
  static AWARDS_MANAGE = 1 << 8;
  static ANNOUNCEMENT_READ = 1 << 9;
  static ANNOUNCEMENT_MANAGE = 1 << 10;

  static DESIGN_CLASS_STUDENT = Permissions.DASHBOARD_ACCESS | Permissions.DESIGN_CLASS_ACCESS;
  static DEVELOPER_CLASS_STUDENT =
    Permissions.DASHBOARD_ACCESS | Permissions.DEVELOPER_CLASS_ACCESS;
  static MODERATOR =
    Permissions.DASHBOARD_ACCESS |
    Permissions.DESIGN_CLASS_MANAGE |
    Permissions.DEVELOPER_CLASS_MANAGE |
    Permissions.ATTENDANCE_MANAGE |
    Permissions.MEMBER_MANAGE |
    Permissions.PORTFOLIO_MANAGE |
    Permissions.AWARDS_MANAGE |
    Permissions.ANNOUNCEMENT_READ |
    Permissions.ANNOUNCEMENT_MANAGE;

  static hasPermission(userPermissions: number, permission: number): boolean {
    return (userPermissions & permission) === permission;
  }

  static grantPermission(userPermissions: number, permission: number): number {
    return userPermissions | permission;
  }

  static revokePermission(userPermissions: number, permission: number): number {
    return userPermissions & ~permission;
  }
}
                                                                                                                                                                                                                                                