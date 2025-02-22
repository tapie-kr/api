const PrivateAwardQueryKey = "award/private";

export const PrivateAwardQueryKeys = {
  AWARDS: [PrivateAwardQueryKey, "awards"],
  AWARD_DETAIL: (uuid: string) => [PrivateAwardQueryKey, "awards", uuid],
  AWARD_MEMBERS: (uuid: string) => [
    PrivateAwardQueryKey,
    "awards",
    uuid,
    "members",
  ],
  COMPETITIONS: [PrivateAwardQueryKey, "competitions"],
  COMPETITION_AWARDS: (uuid: string) => [
    PrivateAwardQueryKey,
    "competitions",
    uuid,
  ],
};
