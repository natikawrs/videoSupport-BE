import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { EmployeeDatabase } from './database/employeeDB';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeeDatabase, PrismaService],
})
export class EmployeesModule {}
