import { Injectable, NotFoundException } from "@nestjs/common";
import { User, UserType } from "./entities/users.entity";
import { UsersDao } from "./users.dao";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersDao: UsersDao
    ) { }

    async getprofile(id: string): Promise<UserType> {
        const user = await this.usersDao.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const userObj = user.toObject();

        return {
            id: userObj._id.toString(),
            name: userObj.name,
            email: userObj.email,
            password: userObj.password,
        };
    }

    async getChatUsers(id: string): Promise<User[]> {
        const user = await this.usersDao.findById(id);

        if (!user || !user.role || !user.role.name) {
            throw new Error('User not found or invalid role.');
        }

        return await this.usersDao.find(user.id);
    }

    async updateUserStatus(userId: string, online: boolean, lastSeen: Date | null) {
        const existingStatus = await this.usersDao.findUserStatus(userId);

        if (existingStatus) {
            existingStatus.online = online;
            existingStatus.lastSeen = lastSeen;
            existingStatus.lastUpdated = new Date();
            return await existingStatus.save();
        } else {
            return this.usersDao.createUserStatus(userId, online, lastSeen);
        }
    }
}