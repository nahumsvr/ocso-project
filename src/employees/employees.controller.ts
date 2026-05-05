import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/roles.constants";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiAuth } from "src/auth/decorators/api.decorator";
import { AwsService } from "src/aws/aws.service";

@ApiAuth()
@ApiTags("Employees")
@Controller("employees")
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly awsService: AwsService,
  ) {}

  @Auth(ROLES.MANAGER)
  @Post()
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUID",
      employeeName: "Karlo",
      employeeLastName: "Paz",
      employeePhoneNumber: "123456789",
      employeeEmail: "karlo@example.com",
      location: {},
    },
  })
  @UseInterceptors(FileInterceptor("employeePhotoUrl"))
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file.size > 0) {
      const photoUrl = await this.awsService.uploadFile(file);
      createEmployeeDto.employeePhotoUrl = photoUrl;
    }
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Post("/photo/:id")
  @UseInterceptors(FileInterceptor("file"))
  async uploadPhoto(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const res = await this.awsService.uploadFile(file);
    console.log(res);
    return this.employeesService.update(id, {
      employeePhotoUrl: res,
    });
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get("location/:id")
  findAllByLocation(@Param("id", ParseIntPipe) id: number) {
    return this.employeesService.findByLocation(id);
  }

  @Auth(ROLES.MANAGER)
  @Get(":id")
  findOne(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Patch(":id")
  @UseInterceptors(FileInterceptor("employeePhotoUrl"))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    if (file.size > 0) {
      const fileUrl = await this.awsService.uploadFile(file);
      updateEmployeeDto.employeePhotoUrl = fileUrl;
    }
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(":id")
  remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.employeesService.remove(id);
  }
}
