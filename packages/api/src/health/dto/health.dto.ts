import { ApiProperty } from "@nestjs/swagger"

export class HealthDto {
    @ApiProperty({
        example: 'ok',
        description: '서버 상태',
    })
    public status: string;
    
    @ApiProperty({
        example: '2021-08-31T07:00:00.000Z',
        description: '응답 시간',
    })
    public timestamp: string;
}