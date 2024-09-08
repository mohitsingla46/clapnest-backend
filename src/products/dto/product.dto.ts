import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class ProductDto{
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    inStock: boolean;

    @IsNotEmpty()
    @ApiProperty()
    category_id: string | Types.ObjectId;
}