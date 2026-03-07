import { Body, Injectable } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Injectable()
export class EmployeesService {
  private _employees = [
    {
      id: 1,
      name: "nahum",
      lastName: "salvador",
      phoneNumber: "7771114477",
    },
    {
      id: 2,
      name: "hector",
      lastName: "ramirez",
      phoneNumber: "4441114477",
    },
  ];

  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this._employees.length + 1;
    this._employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this._employees;
  }

  findOne(id: number) {
    return this._employees.find((e) => e.id == id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = this.findOne(id);
    if (!employeeToUpdate) return { error: "Usuario no encontrado" };

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

  remove(id: number) {
    const employee = this._employees.find((e) => e.id == id);
    if (!employee) return { error: "empleado no encontrado" };
    const newEmployees = this._employees.filter((e) => e.id !== id);
    this._employees = newEmployees;
    return {
      succes: `Empleado ${employee.name} con el id ${employee.id} ha sido eliminado`,
    };
  }
}
