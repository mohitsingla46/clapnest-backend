import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/users.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserStatus } from "./entities/user-status.entity";

@Injectable()
export class UsersDao {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('UserStatus') private userStatusModel: Model<UserStatus>
    ) { }

    async findById(id: string) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async find(userId: string) {
        return this.userModel.find({ _id: { $ne: userId } }).exec();
    }

    async updateUserStatus(userId: string, online: boolean, lastSeen: Date | null) {
        return await this.userModel.findByIdAndUpdate(
            userId,
            { online, lastSeen },
            { new: true },
        ).exec();
    }

    async findUserStatus(userId: string) {
        return await this.userStatusModel.findOne({ userId });
    }

    async createUserStatus(userId: string, online: boolean, lastSeen: Date | null) {
        const newUserStatus = new this.userStatusModel({
            userId,
            online,
            lastSeen,
            lastUpdated: new Date(),
        });
        return await newUserStatus.save();
    }
}