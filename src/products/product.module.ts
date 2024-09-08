import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { User, UserSchema } from '../auth/schemas/users.schema';
import { ProductDao } from './product.dao';
import { ResponseService } from '../common/services/response.service';
import { Category, CategorySchema } from '../category/schemas/category.schema';
import { CategoryService } from '../category/category.service';
import { CategoryDao } from '../category/category.dao';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Product.name, schema: ProductSchema
        },
        {
            name: User.name, schema: UserSchema
        },
        {
            name: Category.name, schema: CategorySchema
        }
    ])],
    controllers: [ProductController],
    providers: [CategoryDao, CategoryService, ProductDao, ProductService, ResponseService]
})
export class ProductModule { }
