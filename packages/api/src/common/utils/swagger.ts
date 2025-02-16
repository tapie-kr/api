import { APIResponseDto } from '@/common/dto/response.dto';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiCommonResponse = <TModel extends Type<unknown> | object>(
  model?: TModel,
) => {
  const baseProperties = {
    status: { type: 'number' },
    message: { type: 'string' },
    responseAt: {
      type: 'string',
      format: 'date-time',
    },
  };

  const dataProperty = model
    ? model instanceof Function
      ? { $ref: getSchemaPath(model) }
      : Array.isArray(model)
        ? { type: 'array', items: { $ref: getSchemaPath(model[0]) } }
        : {
            type: 'object',
            example: model,
          }
    : {
        type: 'object',
        nullable: true,
        example: {},
      };

  const schema = {
    allOf: [
      { $ref: getSchemaPath(APIResponseDto) },
      {
        properties: {
          ...baseProperties,
          data: dataProperty,
        },
      },
    ],
  };

  return applyDecorators(
    model && model instanceof Function
      ? ApiExtraModels(model)
      : ApiExtraModels(APIResponseDto),
    ApiResponse({
      status: 200,
      schema,
    }),
  );
};

export const ApiFixedResponse = (fixedValue: unknown) => {
  const baseProperties = {
    status: { type: 'number' },
    message: { type: 'string' },
    responseAt: {
      type: 'string',
      format: 'date-time',
    },
  };

  const fixedProperty = {
    data: {
      type: typeof fixedValue,
      example: fixedValue,
    },
  };

  const schema = {
    allOf: [
      { $ref: getSchemaPath(APIResponseDto) },
      {
        properties: {
          ...baseProperties,
          ...fixedProperty,
        },
      },
    ],
  };

  return applyDecorators(
    ApiResponse({
      status: 200,
      schema,
    }),
  );
};
