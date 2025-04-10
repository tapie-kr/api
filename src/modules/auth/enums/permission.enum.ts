export enum PermissionType {
	NONE = 0,
	READ = 1 << 0,
	WRITE = 1 << 1,
	DELETE = 1 << 2,
	FULL = READ | WRITE | DELETE,
}

export enum PermissionTarget {
	ANNOUNCEMENT = 1 << 0,
	ASSIGNMENT = 1 << 1,
	AUDIT_LOG = 1 << 2,
	AWARD = 1 << 3,
	CLASS = 1 << 4,
	CLASSROOM = 1 << 5,
	INTERVIEW = 1 << 6,
	PROJECT = 1 << 7,
	STATISTICS = 1 << 8,
	SURVEY = 1 << 9,
}
