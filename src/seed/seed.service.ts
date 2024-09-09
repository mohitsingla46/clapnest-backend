import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);
    private roles: any[];

    constructor(
        @InjectModel("Role") private roleModel: Model<Role>
    ) {
        const rolesFile = join(process.cwd(), 'src/seed/data', 'roles.json');
        this.roles = JSON.parse(readFileSync(rolesFile, 'utf-8'));
    }

    async seed() {
        try {
            for (const role of this.roles) {
                const roleAdded = await this.roleModel.findOne({ name: role.name });
                if (!roleAdded) {
                    await this.roleModel.create(role);
                    this.logger.log(`Inserted role: ${role.name}`);
                } else {
                    this.logger.log(`Role ${role.name} already exists`);
                }
            }
        } catch (error) {
            this.logger.error('Error processing categories', error);
        }
    }
}
