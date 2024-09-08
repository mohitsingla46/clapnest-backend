import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe, UseGuards, Put } from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { Product } from "./schemas/product.schema";
import { ProductService } from "./product.service";
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from "../decorators/roles.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { admin, vendor, user } from "../utils/constants";

@Controller('product')
@UseGuards(AuthGuard)

export class ProductController {
    constructor(private productService: ProductService) { }

    @Post('')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, vendor)
    @UsePipes(ValidationPipe)
    async addproduct(@Body() product: ProductDto): Promise<any> {
        return this.productService.addproduct(product);
    }

    @Get('')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, vendor, user)
    async getproducts(): Promise<any> {
        return this.productService.getproducts();
    }

    @Get(':id')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, vendor, user)
    async getProduct(@Param('id') id: string): Promise<any> {
        return this.productService.getproductbyid(id);
    }

    @Put(':id')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, vendor)
    async updateProduct(@Param('id') id: string, @Body() product: ProductDto): Promise<any> {
        return this.productService.updateProduct(id, product);
    }

    @Delete(':id')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, vendor)
    async deleteProduct(@Param('id') id: string): Promise<any> {
        return this.productService.deleteproductbyid(id);
    }
}