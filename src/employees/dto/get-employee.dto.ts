import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetEmployeeByIdDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'id',
    example: '6f8aa1f4-edf7-4859-9688-6b575ac6f07d',
  })
  id: string;
}

export class GetAllEmployeessDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'firstName',
    example: 'all',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'department',
    example: 'all',
  })
  department = 'all';

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    type: 'string',
    name: 'orderBy',
    example: 'sorting',
  })
  orderBy = 'sorting';

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  @ApiProperty({
    type: Number,
    name: 'page',
    example: 1,
  })
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  @ApiProperty({
    type: Number,
    name: 'pageSize',
    example: 10,
  })
  pageSize: number;
}
