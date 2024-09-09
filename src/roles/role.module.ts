import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleDao } from "./role.dao";
import { RoleService } from "./role.service";
import { RoleSchema } from "./entities/role.entity";
import { RoleResolver } from "./role.resolver";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Role", schema: RoleSchema }])
    ],
    providers: [RoleResolver, RoleDao, RoleService]
})

export class RolesModule { }