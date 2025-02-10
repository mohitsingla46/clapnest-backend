import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "./entities/role.entity";

@Injectable({})
export class RoleRepository {
    constructor(
        @InjectModel("Role")
        private roleModel: Model<Role>
    ) { }

    async getRoles() {
        return await this.roleModel.find();
    }
}