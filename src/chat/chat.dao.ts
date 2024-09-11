import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/auth/entities/users.entity";

@Injectable()
export class ChatDao {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
    ) { }

    async find(oppositeRole: string) {
        return this.userModel.find({ 'role.name': oppositeRole }).exec();
    }
}