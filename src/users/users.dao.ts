import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/users.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersDao {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
    ) {}

    async findById(id: string) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async find(oppositeRole: string) {
        return this.userModel.find({ 'role.name': oppositeRole }).exec();
    }
}