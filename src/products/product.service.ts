import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ProductDao } from './product.dao';
import { ResponseService } from "../common/services/response.service";
import { ResponseDto } from "src/common/dto/response.dto";
import { ProductDto } from "./dto/product.dto";
import { CategoryService } from "../category/category.service";

@Injectable({})
export class ProductService {
    constructor(
        private readonly productDao: ProductDao,
        private readonly categoryService: CategoryService,
        private readonly responseService: ResponseService
    ) { }

    async addproduct(productDto: ProductDto): Promise<ResponseDto<any>> {
        try {
            const { category_id, ...productData } = productDto;
            const categoryObject = await this.categoryService.getCategoryById(category_id.toString());
            if (!categoryObject) {
                const error = `Category with ID ${category_id} not found`;
                return this.responseService.error(error, HttpStatus.BAD_REQUEST);
            }
            const productAdded = await this.productDao.create({
                ...productData,
                category: {
                    _id: categoryObject._id,
                    name: categoryObject.name
                }
            });
            return this.responseService.success(productAdded);
        } catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getproducts(): Promise<ResponseDto<any>> {
        try {
            const products = await this.productDao.find();
            return this.responseService.success(products);
        } catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getproductbyid(id: string): Promise<ResponseDto<any>> {
        try {
            const product = await this.productDao.findById(id);
            if (product) {
                return this.responseService.success(product);
            }

            return this.responseService.error('Product not found', HttpStatus.BAD_REQUEST);
        } catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteproductbyid(id: string): Promise<ResponseDto<any>> {
        try {
            const product = await this.productDao.findByIdAndDelete(id);
            return this.responseService.success(product);
        } catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async updateProduct(id: string, productDto: ProductDto): Promise<ResponseDto<any>> {
        try {
            const product = await this.productDao.update(id, productDto);
            return this.responseService.success(product);
        } catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}