import { Injectable } from "@nestjs/common";
import { Book } from "./schemas/books.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class BookDao {
    constructor(
        @InjectModel(Book.name)
        private bookModel: Model<Book>
    ) { }

    async create(book: Book): Promise<Book> {
        return this.bookModel.create(book);
    }

    async find() {
        return await this.bookModel.find();
    }

    async findById(id: string): Promise<Book> {
        return await this.bookModel.findById(id);
    }

    async findByIdAndDelete(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete(id);
    }
}
