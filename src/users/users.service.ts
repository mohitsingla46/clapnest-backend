import { Injectable, NotFoundException } from "@nestjs/common";
import { User, UserType } from "./entities/users.entity";
import { UsersRepository } from "./users.repository";
import { formatDistanceToNow } from "date-fns";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async getprofile(id: string): Promise<UserType> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const userStatus = await this.usersRepository.findUserStatus(id);

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            online: userStatus?.online || false,
            lastSeen: userStatus?.lastSeen || null,
            formattedLastSeen: userStatus?.lastSeen ? formatDistanceToNow(new Date(userStatus.lastSeen), { addSuffix: true }) : null
        };
    }

    async getChatUsers(id: string): Promise<User[]> {
        const user = await this.usersRepository.findById(id);

        if (!user || !user.role || !user.role.name) {
            throw new Error('User not found or invalid role.');
        }

        return await this.usersRepository.find(user.id);
    }

    async updateUserStatus(userId: string, online: boolean, lastSeen: Date | null) {
        const existingStatus = await this.usersRepository.findUserStatus(userId);

        if (existingStatus) {
            existingStatus.online = online;
            existingStatus.lastSeen = lastSeen;
            existingStatus.lastUpdated = new Date();
            return await existingStatus.save();
        } else {
            return this.usersRepository.createUserStatus(userId, online, lastSeen);
        }
    }
}