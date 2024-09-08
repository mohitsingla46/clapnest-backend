import { Injectable } from "@nestjs/common";
import { CategoryDao } from "./category.dao";
import { ResponseService } from "../common/services/response.service";
import { ResponseDto } from "../common/dto/response.dto";

@Injectable({})
export class CategoryService {
    constructor(
        private readonly categoryDao: CategoryDao,
        private readonly responseService: ResponseService
    ) { }

    async getCategories(): Promise<ResponseDto<any>> {
        const categories = await this.categoryDao.find();
        return this.responseService.success(categories);
    }

    async getCategoryById(id: string): Promise<any> {
        return await this.categoryDao.findById(id);
    }
}