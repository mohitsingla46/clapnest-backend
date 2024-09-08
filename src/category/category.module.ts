import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./schemas/category.schema";
import { CategoryController } from "./category.controller";
import { CategoryDao } from "./category.dao";
import { CategoryService } from "./category.service";
import { ResponseService } from "../common/services/response.service";
import { User, UserSchema } from "../auth/schemas/users.schema";

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Category.name, schema: CategorySchema
        },
        {
            name: User.name, schema: UserSchema
        }
    ])],
    controllers: [CategoryController],
    providers: [CategoryDao, CategoryService, ResponseService]
})

export class CategoryModule { }