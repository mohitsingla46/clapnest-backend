import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { Category } from "../../category/schemas/category.schema";

@Schema({
    timestamps: true
})
export class Product{
    @Prop({required: true})
    name: string;

    @Prop()
    description: string;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    inStock: boolean;

    @Prop({type: Types.ObjectId, required:true, ref: Category.name})
    category: string | Types.ObjectId | Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);