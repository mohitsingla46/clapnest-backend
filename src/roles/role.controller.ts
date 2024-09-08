import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoleService } from "./role.service";

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Get('list')
    @ApiTags('public')
    async getRoles(): Promise<any> {
        return this.roleService.getRoles();
    }
}