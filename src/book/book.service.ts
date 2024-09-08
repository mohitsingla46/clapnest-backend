import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Book } from "./schemas/books.schema";
import { BookDao } from './book.dao';
import { ResponseService } from "../common/services/response.service";
import { ResponseDto } from "src/common/dto/response.dto";

@Injectable({})
export class BookService {
    constructor(
        private readonly bookDao: BookDao,
        private readonly responseService: ResponseService
    ) { }

    async addbook(book: Book): Promise<ResponseDto<any>> {
        try {
            const bookAdded = await this.bookDao.create(book);
            return this.responseService.success(bookAdded);
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getbooks(): Promise<ResponseDto<any>> {
        try {
            const books = await this.bookDao.find();
            return this.responseService.success(books);
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getbookbyid(id: string): Promise<ResponseDto<any>> {
        try {
            const book = await this.bookDao.findById(id);
            if (book) {
                return this.responseService.success(book);
            }

            return this.responseService.error('Book not found', HttpStatus.BAD_REQUEST);
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deletebookbyid(id: string): Promise<ResponseDto<any>> {
        try {
            const book = await this.bookDao.findByIdAndDelete(id);
            return this.responseService.success(book);
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}