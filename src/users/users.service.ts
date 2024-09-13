import { Injectable } from "@nestjs/common";
import { User } from "./entities/users.entity";
import { UsersDao } from "./users.dao";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersDao: UsersDao
    ) {}

    async getprofile(id: string): Promise<User> {
        return await this.usersDao.findById(id);
    }

    async getChatUsers(id: string): Promise<User[]> {
        const user = await this.usersDao.findById(id);

        if (!user || !user.role || !user.role.name) {
            throw new Error('User not found or invalid role.');
        }

        const userRole = user.role.name;

        let oppositeRole = '';
        if (userRole === 'PROFESSIONAL') {
            oppositeRole = 'CUSTOMER';
        } else if (userRole === 'CUSTOMER') {
            oppositeRole = 'PROFESSIONAL';
        } else {
            oppositeRole = '';
        }

        return await this.usersDao.find(oppositeRole);
    }
}