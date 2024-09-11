import { Injectable } from "@nestjs/common";
import { ChatDao } from "./chat.dao";
import { User } from "src/auth/entities/users.entity";
import { AuthDao } from "src/auth/auth.dao";

@Injectable()
export class ChatService {
    constructor(
        private readonly chatDao: ChatDao,
        private readonly authDao: AuthDao
    ) { }

    async getUsers(id: string): Promise<User[]> {
        const user = await this.authDao.findById(id);

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

        return await this.chatDao.find(oppositeRole);
    }
}