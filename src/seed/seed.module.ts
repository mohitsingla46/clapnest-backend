import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { RoleSchema } from '../roles/entities/role.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { 
                name: "Role", schema: RoleSchema
            }
        ]),
    ],
    providers: [SeedService],
})
export class SeedModule { }