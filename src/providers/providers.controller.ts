import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { UserData } from "src/auth/decorators/user.decorator";
import { User } from "src/auth/entities/user.entity";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/constants/roles.constants";

@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Auth(ROLES.MANAGER)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get()
  findAll(@UserData() user: User) {
    if(user.userRoles.includes("Employee")) throw new UnauthorizedException("No estás autorizado, solo managers y admins");
    return this.providersService.findAll();
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.providersService.findOne(id);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get("/name/:name")
  findOneByName(@Param("name") name: string) {
    return this.providersService.findOneByName(name);
  }

  @Auth(ROLES.MANAGER)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.providersService.remove(id);
  }
}
