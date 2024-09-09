import { Query, Resolver } from "@nestjs/graphql";
import { RoleType } from "./entities/role.entity";
import { RoleService } from "./role.service";

@Resolver()
export class RoleResolver {
    constructor(private roleService: RoleService) { }

    @Query(() => [RoleType])
    async getRoles() {
        return this.roleService.getRoles();
    }
}