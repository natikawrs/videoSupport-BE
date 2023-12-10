import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { EmployeesService } from '../employees.service';
import { EmployeeDatabase } from '../database/employeeDB';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let employeeDataBase: jest.Mocked<EmployeeDatabase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: EmployeeDatabase,
          useFactory: () => ({
            getAllEmployeesInDB: jest.fn(),
            getAllDepartmentsInDB: jest.fn(),
          }),
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    employeeDataBase = module.get(EmployeeDatabase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllEmployees', () => {
    it('should return employees', async () => {
      const dto = {
        firstName: 'all',
        department: 'all',
        orderBy: 'sorting',
        page: 1,
        pageSize: 34,
      };

      const expectedResponse = {
        totalEmployees: 10084,
        totalPages: 297,
        currentPage: 1,
        pageSize: 34,
        employees: [
          {
            id: '083cbf24-502c-4103-bebb-8936d4bbfa6f',
            firstName: 'Emma',
            lastName: 'Harris',
            salary: 120000,
            department: 'Engineering',
          },
        ],
      };

      employeeDataBase.getAllEmployeesInDB.mockResolvedValue(expectedResponse);

      const result = await service.getAllEmployees(dto);

      expect(result).toEqual(expectedResponse);
      expect(employeeDataBase.getAllEmployeesInDB).toHaveBeenCalledWith(dto);
    });
    it('should handle errors and throw Error', async () => {
      const dto = {
        firstName: 'all',
        department: 'all',
        orderBy: 'sorting',
        page: 1,
        pageSize: 34,
      };

      const errorMock = new Error('Mocked error message');
      employeeDataBase.getAllEmployeesInDB.mockRejectedValue(errorMock);

      await expect(service.getAllEmployees(dto)).rejects.toThrow(Error);
      expect(employeeDataBase.getAllEmployeesInDB).toHaveBeenCalled();
    });
  });

  describe('getAllDepartments', () => {
    it('should return all departments', async () => {
      const expectedResponse = [
        'HR',
        'Finance',
        'IT',
        'Engineering',
        'Sales',
        'Marketing',
        'ggiiii',
      ];

      employeeDataBase.getAllDepartmentsInDB.mockResolvedValue(
        expectedResponse,
      );

      const result = await service.getAllDepartments();

      expect(result).toEqual(expectedResponse);
      expect(employeeDataBase.getAllDepartmentsInDB).toHaveBeenCalled();
    });

    it('should handle errors and throw Error', async () => {
      const errorMock = new Error('Mocked error message');
      employeeDataBase.getAllDepartmentsInDB.mockRejectedValue(errorMock);

      await expect(service.getAllDepartments()).rejects.toThrow(Error);
      expect(employeeDataBase.getAllDepartmentsInDB).toHaveBeenCalled();
    });
  });
});
