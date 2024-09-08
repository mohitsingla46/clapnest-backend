import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./schemas/category.schema";
import { Model } from "mongoose";
import { ObjectId } from "typeorm";

@Injectable()

export class CategoryDao {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<Category>
    ) { }

    async find() {
        return await this.categoryModel.find();
    }

    async findById(id: string | ObjectId) {
        return await this.categoryModel.findById(id).select('_id name').exec();
    }
}