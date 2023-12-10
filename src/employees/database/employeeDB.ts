import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  GetAllEmployeessDto,
  GetEmployeeByIdDto,
} from '../dto/get-employee.dto';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

@Injectable()
export class EmployeeDatabase {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployeeByIdInDB(idDto: GetEmployeeByIdDto) {
    const { id } = idDto;
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async getAllEmployeesInDB(searchDto: GetAllEmployeessDto) {
    const { firstName, department, orderBy } = searchDto;
    let { page, pageSize } = searchDto;
    page = page || 1;
    pageSize = pageSize || 10;

    let whereCondition = {};

    if (firstName && firstName.toLowerCase() !== 'all') {
      whereCondition = {
        ...whereCondition,
        firstName: {
          contains: firstName,
          mode: 'insensitive',
        },
      };
    }

    if (department && department !== 'all') {
      whereCondition = {
        ...whereCondition,
        department: {
          contains: department,
          mode: 'insensitive',
        },
      };
    }

    const totalEmployees = await this.prisma.employee.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalEmployees / pageSize);

    const skip = (page - 1) * pageSize;

    const employees = await this.prisma.employee.findMany({
      where: whereCondition,
      orderBy:
        orderBy === 'minTomax'
          ? { salary: 'asc' }
          : orderBy === 'maxTomin'
            ? { salary: 'desc' }
            : undefined,
      skip,
      take: pageSize,
    });

    return {
      totalEmployees,
      totalPages,
      currentPage: page,
      pageSize,
      employees,
    };
  }

  async getAllDepartmentsInDB(): Promise<string[]> {
    const employees = await this.prisma.employee.findMany();
    const uniqueDepartments = Array.from(
      new Set(employees.map((employee) => employee.department)),
    );

    return uniqueDepartments;
  }
  async createEmployeeinDB(dto: CreateEmployeeDto) {
    // Check if the firstName + lastName already exists
    const existingFirstName = await this.prisma.employee.findFirst({
      where: { firstName: dto.firstName },
    });

    const existingLastName = await this.prisma.employee.findFirst({
      where: { lastName: dto.lastName },
    });

    if (existingFirstName && existingLastName) {
      throw new ConflictException('Employee already exists');
    }

    // Createthe employee
    const createdEmployee = await this.prisma.employee.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        salary: dto.salary,
        department: dto.department,
      },
    });

    if (!createdEmployee) {
      throw new NotFoundException('User not created');
    }

    return createdEmployee;
  }

  async updateEmployeeInDB(id: string, dto: CreateEmployeeDto): Promise<any> {
    // Check if the employee with the given ID exists
    const existingEmployee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      throw new NotFoundException('Employee not found');
    }
    // Check if the updated firstName + lastName already exists for another employee
    const existingConflict = await this.prisma.employee.findFirst({
      where: {
        id: { not: id }, // Exclude the current employee being updated
        firstName: { equals: dto.firstName, mode: 'insensitive' },
        lastName: { equals: dto.lastName, mode: 'insensitive' },
      },
    });

    if (existingConflict) {
      throw new ConflictException('Employee with the same name already exists');
    }

    // Update the employee
    const updatedEmployee = await this.prisma.employee.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        salary: dto.salary,
        department: dto.department,
      },
    });

    return updatedEmployee;
  }

  async deleteEmployeeFromDB(idDto: GetEmployeeByIdDto): Promise<any> {
    const { id } = idDto;
    // Check if the employee with the given ID exists
    const existingEmployee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      throw new NotFoundException('Employee not found');
    }

    // Delete the employee
    const deletedEmployee = await this.prisma.employee.delete({
      where: { id },
    });

    return deletedEmployee;
  }
}
