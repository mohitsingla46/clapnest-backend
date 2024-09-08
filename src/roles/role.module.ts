import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "../auth/schemas/role.schema";
import { RoleController } from "./role.controller";
import { RoleDao } from "./role.dao";
import { RoleService } from "./role.service";
import { ResponseService } from "../common/services/response.service";

@Module({
    imports:[
        MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}])
    ],
    controllers: [RoleController],
    providers: [RoleDao, RoleService, ResponseService]
})

export class RolesModule {}