import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../auth/schemas/role.schema';
import { Category } from '../category/schemas/category.schema';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);
    private categories: any[];
    private roles: any[];

    constructor(
        @InjectModel(Role.name) private roleModel: Model<Role>,
        @InjectModel(Category.name) private categoryModel: Model<Category>
    ) {
        const cateforiesFile = join(process.cwd(), 'src/seed/data', 'categories.json');
        this.categories = JSON.parse(readFileSync(cateforiesFile, 'utf-8'));
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

            for (const category of this.categories) {
                let categoryAdded = await this.categoryModel.findOne({ name: category.name });
                if (!categoryAdded) {
                    await this.categoryModel.create(category);
                    this.logger.log(`Inserted category: ${category.name}`);
                } else {
                    this.logger.log(`Category ${category.name} already exists`);
                }
            }
        } catch (error) {
            this.logger.error('Error processing categories', error);
        }
    }
}
