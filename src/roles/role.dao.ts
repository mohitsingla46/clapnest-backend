import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Role } from "../auth/schemas/role.schema";
import { Model } from "mongoose";

@Injectable({})
export class RoleDao{
    constructor(
        @InjectModel(Role.name)
        private roleModel: Model<Role>
    ) {}

    async getRoles() {
        return await this.roleModel.find();
    }
}