import { z } from "zod"
import { BaseResponse } from "./base"

/**
 * 파일 업로드를 위한 presigned url 스키마
 * @description Presigned URL schema
 */
export const filePresignedUrlSchema = z.object({
    presignedUrl: z.string(),
})
export type FilePresignedUrl = z.infer<typeof filePresignedUrlSchema>
export type FilePresignedUrlResponse = BaseResponse<typeof filePresignedUrlSchema>