import { HttpStatus, Injectable } from "@nestjs/common";
import { RoleDao } from "./role.dao";
import { ResponseService } from "../common/services/response.service";
import { ResponseDto } from "src/common/dto/response.dto";

@Injectable({})
export class RoleService {
    constructor(
        private readonly roleDao: RoleDao,
        private readonly responseService: ResponseService
    ) {}

    async getRoles(): Promise<ResponseDto<any>> {
        try {
            const roles = await this.roleDao.getRoles();
            return this.responseService.success(roles);
        } catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}