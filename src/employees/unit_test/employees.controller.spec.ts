import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from '../employees.controller';
import { EmployeesService } from '../employees.service';
import { EmployeeDatabase } from '../database/employeeDB';
import { PrismaService } from 'src/prisma.service';

describe('EmployeesController', () => {
  let controller: EmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService, EmployeeDatabase, PrismaService],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
