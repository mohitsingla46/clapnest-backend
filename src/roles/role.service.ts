import { Injectable } from "@nestjs/common";
import { RoleRepository } from "./role.repository";
import { Role } from "./entities/role.entity";

@Injectable({})
export class RoleService {
    constructor(
        private readonly roleRepository: RoleRepository
    ) { }

    async getRoles(): Promise<Role[]> {
        return await this.roleRepository.getRoles();
    }
}