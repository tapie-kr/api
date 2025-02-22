import { MemberRole } from "@/constants/member-role"
import { UnitType } from "@/constants/unit-type"
import { z } from "zod"
import { BaseResponse } from "@/schemas/base"

export const publicMemberSchema = z.object({
    uuid: z.string(),
    name: z.string(),
    username: z.string(),
    role: z.nativeEnum(MemberRole),
    unit: z.nativeEnum(UnitType),
    generation: z.number(),
    googleEmail: z.string(),
    profileUrl: z.string(),
});

export const publicMemberListResponseSchema = z.array(publicMemberSchema);
export type PublicMemberListResponse = BaseResponse<typeof publicMemberListResponseSchema>;