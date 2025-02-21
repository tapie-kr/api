import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

class APIResponseDto<T> {
  @ApiProperty({ example: HttpStatus.OK })
  public status: HttpStatus;

  @ApiProperty({ example: 'OK' })
  public message: string;

  @ApiProperty({ nullable: true })
  public data: T;

  @ApiProperty({
    example: '2024-02-16T16:44:42Z',
    format:  'date-time',
  })
  public responseAt: string;
}

type SwaggerStatusCodeType = number | 'default' | '1XX' | '2XX' | '3XX' | '4XX' | '5XX';

export const ApiCommonResponse = (status: SwaggerStatusCodeType = 200, obj: SchemaObject & Partial<ReferenceObject>) => {
  const baseProperties = {
    status: {
      type: 'number', example: status,
    },
    message:    { type: 'string' },
    responseAt: {
      type: 'string', format: 'date-time',
    },
  };

  const dataProperty = obj
    ? { ...obj  }
    : {
      type: 'object', nullable: true, example: {},
    };

  const schema = { allOf: [
    { $ref: getSchemaPath(APIResponseDto) },
    { properties: {
      ...baseProperties,
      data: dataProperty,
    } },
  ] };

  return applyDecorators(ApiResponse({
    status, schema,
  }));
};

export const ApiFixedResponse = (fixedValue: unknown) => {
  const baseProperties = {
    status:     { type: 'number' },
    message:    { type: 'string' },
    responseAt: {
      type: 'string', format: 'date-time',
    },
  };

  const fixedProperty = { data: {
    type: typeof fixedValue, example: fixedValue,
  } };

  const schema = { allOf: [
    { $ref: getSchemaPath(APIResponseDto) },
    { properties: {
      ...baseProperties,
      ...fixedProperty,
    } },
  ] };

  return applyDecorators(ApiResponse({
    status: 200, schema,
  }));
};
