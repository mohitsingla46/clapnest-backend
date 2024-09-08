import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../decorators/roles.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { admin, customer, professional } from "../utils/constants";
import { CategoryService } from "./category.service";

@Controller('category')
@UseGuards(AuthGuard)

export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get('list')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, professional, customer)
    async getCategories(): Promise<any> {
        return this.categoryService.getCategories();
    }
}