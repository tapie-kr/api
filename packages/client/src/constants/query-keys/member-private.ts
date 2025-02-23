const PrivateMemberQueryKey = 'member/private';

export type PrivateMemberQueryKey = typeof PrivateMemberQueryKey;

export const PrivateMemberQueryKeys = {
  all:    [PrivateMemberQueryKey],
  lists:  () => [...PrivateMemberQueryKeys.all, 'list'],
  detail: (uuid: string) => [
    ...PrivateMemberQueryKeys.all,
    'detail',
    uuid,
  ],
  links: {
    all: (memberUUID: string) => [
      ...PrivateMemberQueryKeys.all,
      'links',
      memberUUID,
    ],
    detail: (memberUUID: string, linkUUID: string) => [
      ...PrivateMemberQueryKeys.all,
      'links',
      memberUUID,
      linkUUID,
    ],
  },
  skills: {
    all: (memberUUID: string) => [
      ...PrivateMemberQueryKeys.all,
      'skills',
      memberUUID,
    ],
    detail: (memberUUID: string, skillUUID: string) => [
      ...PrivateMemberQueryKeys.all,
      'skills',
      memberUUID,
      skillUUID,
    ],
  },
  profile: (memberUUID: string) => [
    ...PrivateMemberQueryKeys.all,
    'profile',
    memberUUID,
  ],
};
