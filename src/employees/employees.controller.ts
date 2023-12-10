import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiExtraModels } from '@nestjs/swagger';
import {
  GetAllEmployeessDto,
  GetEmployeeByIdDto,
} from './dto/get-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('/getEmployeeById/:id')
  @ApiExtraModels(GetEmployeeByIdDto)
  @HttpCode(HttpStatus.OK)
  async getEmployeeByIdController(@Param() param: GetEmployeeByIdDto) {
    return await this.employeesService.getEmployeeById(param);
  }

  @Post('/getAllEmployees')
  @ApiExtraModels(GetAllEmployeessDto)
  @HttpCode(HttpStatus.OK)
  async searchPostsByTitleController(@Body() dto: GetAllEmployeessDto) {
    return await this.employeesService.getAllEmployees(dto);
  }

  @Get('/getAllDepartments')
  @ApiExtraModels(GetEmployeeByIdDto)
  @HttpCode(HttpStatus.OK)
  async getAllDepartmentsController() {
    return await this.employeesService.getAllDepartments();
  }

  @Post('/createEmployee')
  @ApiExtraModels(CreateEmployeeDto)
  @HttpCode(HttpStatus.OK)
  async createEmployeeController(@Body() dto: CreateEmployeeDto) {
    return await this.employeesService.createEmployee(dto);
  }

  @Patch('/updateEmployee/:id')
  @ApiExtraModels(CreateEmployeeDto)
  @HttpCode(HttpStatus.OK)
  async updateEmployeeController(
    @Param() param: GetEmployeeByIdDto,
    @Body() dto: CreateEmployeeDto,
  ) {
    return await this.employeesService.updateEmployee(param, dto);
  }

  @Delete('/deleteEmployee/:id')
  @ApiExtraModels(GetEmployeeByIdDto)
  remove(@Param() param: GetEmployeeByIdDto) {
    return this.employeesService.deleteEmployee(param);
  }
}
