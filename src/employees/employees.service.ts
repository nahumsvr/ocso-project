import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { v4 as uuid } from "uuid";

@Injectable()
export class EmployeesService {
  private _employees = [
    {
      id: uuid(),
      name: "nahum",
      lastName: "salvador",
      phoneNumber: "7771114477",
    },
    {
      id: uuid(),
      name: "hector",
      lastName: "ramirez",
      phoneNumber: "4441114477",
    },
  ];

  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this._employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this._employees;
  }

  findOne(id: string) {
    const emp = this._employees.find((e) => e.id == id);
    if (!emp)
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    return emp;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = this.findOne(id);

    const updatedEmployee = {
      ...employeeToUpdate,
      ...updateEmployeeDto,
    };

    const employeesUpDated = this._employees.map((e) => {
      if (e.id !== updatedEmployee.id) return e;
      return updatedEmployee;
    });

    this._employees = employeesUpDated;

    return updatedEmployee;
  }

  remove(id: string) {
    const employee = this.findOne(id);
    const newEmployees = this._employees.filter((e) => e.id !== id);
    this._employees = newEmployees;
    return {
      succes: `Empleado ${employee!.name} con el id ${employee!.id} ha sido eliminado`,
    };
  }
}
