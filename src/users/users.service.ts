import { Injectable, NotFoundException } from "@nestjs/common";
import { User, UserType } from "./entities/users.entity";
import { UsersDao } from "./users.dao";
import { formatDistanceToNow } from "date-fns";

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
            id: userObj._id.toString(), // Ensure correct ID format
            name: userObj.name,
            email: userObj.email,
            password: userObj.password, // Be careful with sensitive data
            online: userObj.online,
            lastSeen: userObj.lastSeen,
            formattedLastSeen: userObj.lastSeen
                ? formatDistanceToNow(new Date(userObj.lastSeen), { addSuffix: true })
                : null,
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
        try {
            const updatedUser = await this.usersDao.updateUserStatus(userId, online, lastSeen);
            return updatedUser;
        } catch (error) {
            console.error(`Error updating user status:`, error);
            throw new Error(`Unable to update user status for userId: ${userId}`);
        }
    }
}