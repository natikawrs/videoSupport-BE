import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Matches(/^[a-zA-Z]+$/, { message: 'firstName should contain only letters.' })
  @ApiProperty({
    type: 'string',
    name: 'firstName',
    example: 'John',
  })
  firstName: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Matches(/^[a-zA-Z]+$/, { message: 'lastName should contain only letters.' })
  @ApiProperty({
    type: 'string',
    name: 'lastName',
    example: 'Doe',
  })
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    name: 'salary',
    example: 10000,
  })
  salary: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    name: 'department',
    example: 'IT',
  })
  department: string;
}
