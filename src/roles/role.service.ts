import { Injectable } from "@nestjs/common";
import { RoleDao } from "./role.dao";
import { Role } from "./entities/role.entity";

@Injectable({})
export class RoleService {
    constructor(
        private readonly roleDao: RoleDao
    ) { }

    async getRoles(): Promise<Role[]> {
        return await this.roleDao.getRoles();
    }
}