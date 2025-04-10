import { PermissionTarget, PermissionType } from '../enums/permission.enum';

export function addPermission(
	previous: number,
	target: PermissionTarget,
	type: PermissionType,
) {
	return previous | (target * type);
}

export function removePermission(
	previous: number,
	target: PermissionTarget,
	type: PermissionType,
) {
	return previous & ~(target * type);
}

export function hasPermission(
	permission: number,
	target: PermissionTarget,
	type: PermissionType,
) {
	return (permission & (target * type)) !== 0;
}
