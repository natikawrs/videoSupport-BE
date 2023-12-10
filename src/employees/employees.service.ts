import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeDatabase } from './database/employeeDB';
import {
  GetAllEmployeessDto,
  GetEmployeeByIdDto,
} from './dto/get-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly employeeDataBase: EmployeeDatabase) {}
  async getEmployeeById(dto: GetEmployeeByIdDto): Promise<any> {
    try {
      return this.employeeDataBase.getEmployeeByIdInDB(dto);
    } catch (error) {
      console.log('error: getEmployeeById', error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllEmployees(dto: GetAllEmployeessDto): Promise<any> {
    try {
      return this.employeeDataBase.getAllEmployeesInDB(dto);
    } catch (error) {
      console.log('error: getAllEmployees', error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllDepartments(): Promise<any> {
    try {
      return this.employeeDataBase.getAllDepartmentsInDB();
    } catch (error) {
      console.log('error: getAllDepartmentsr', error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createEmployee(dto: CreateEmployeeDto): Promise<any> {
    try {
      return await this.employeeDataBase.createEmployeeinDB(dto);
    } catch (error) {
      console.log('error: createEmployee', error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateEmployee(
    id: GetEmployeeByIdDto,
    dto: CreateEmployeeDto,
  ): Promise<any> {
    try {
      return await this.employeeDataBase.updateEmployeeInDB(id.id, dto);
    } catch (error) {
      console.log('error: updateEmployee', error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteEmployee(id: GetEmployeeByIdDto): Promise<any> {
    try {
      return await this.employeeDataBase.deleteEmployeeFromDB(id);
    } catch (error) {
      console.log('error: deleteEmployee', error);
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
