import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe, UseGuards } from "@nestjs/common";
import { BookDto } from "./dto/books.dto";
import { Book } from "./schemas/books.schema";
import { BookService } from "./book.service";
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from "../decorators/roles.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { admin, professional, customer } from "../utils/constants";

@Controller('book')
@UseGuards(AuthGuard)

export class BookController {
    constructor(private bookService: BookService) { }

    @Post('add_book')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, professional)
    @UsePipes(ValidationPipe)
    async addbook(@Body() book: BookDto): Promise<any> {
        return this.bookService.addbook(book);
    }

    @Get('list')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, professional, customer)
    async getbooks(): Promise<any> {
        return this.bookService.getbooks();
    }

    @Get(':id')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, professional, customer)
    async getBook(@Param('id') id: string): Promise<any> {
        return this.bookService.getbookbyid(id);
    }

    @Delete(':id')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, professional)
    async deleteBook(@Param('id') id: string): Promise<any> {
        return this.bookService.deletebookbyid(id);
    }
}