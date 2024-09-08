import { Injectable } from "@nestjs/common";
import { Product } from "./schemas/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class ProductDao {
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<Product>
    ) { }

    async create(product: Product): Promise<Product> {
        return this.productModel.create(product);
    }

    async find() {
        return await this.productModel.find();
    }

    async findById(id: string): Promise<Product> {
        return await this.productModel.findById(id);
    }

    async findByIdAndDelete(id: string): Promise<Product> {
        return await this.productModel.findByIdAndDelete(id);
    }

    async update(id: string, productDto: ProductDto): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(id, productDto, {new: true});
    }
}
