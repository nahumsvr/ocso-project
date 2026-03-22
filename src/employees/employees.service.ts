import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "./entities/employee.entity";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({
      employeeId: id,
    });

    if (!employee) throw new NotFoundException();

    return employee;
  }

  async findByLocation(locationId: number) {
    return await this.employeeRepository.findBy({
      location: { locationId },
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const newEmployee = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto,
    });

    if (!newEmployee) throw new NotFoundException();

    await this.employeeRepository.save(newEmployee);

    return newEmployee;
  }

  async remove(id: string) {
    const employeeToDelete = await this.findOne(id);

    await this.employeeRepository.delete({
      employeeId: id,
    });

    return {
      message: `The employee '${employeeToDelete.employeeName} ${employeeToDelete.employeeLastName}' was deleted`,
      employeeToDelete,
    };
  }
}
