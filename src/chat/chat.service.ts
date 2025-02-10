import { Injectable } from "@nestjs/common";
import { ChatRepository } from "./chat.repository";
import { RoomsRepository } from "../rooms/rooms.repository";
import { UsersRepository } from "../users/users.repository";
import { formatDistanceToNowStrict, isValid } from "date-fns";
import { RoomsService } from "../rooms/rooms.service";

@Injectable()
export class ChatService {
    constructor(
        private readonly roomsRepository: RoomsRepository,
        private readonly chatRepository: ChatRepository,
        private readonly usersRepository: UsersRepository,
        private readonly roomsService: RoomsService,
    ) { }

    async saveMessage(payload: { senderId: string, roomId: string, message: string }) {
        const savedMessage = await this.chatRepository.create(payload);

        const formattedCreatedAt = formatDistanceToNowStrict(new Date(savedMessage.createdAt), { addSuffix: true });

        return { ...savedMessage.toObject(), formattedCreatedAt };
    }

    async getChats(userId: string) {
        const rooms = await this.roomsRepository.getRoomsByUserId(userId);

        const usersWithLastMessage = [];

        for (const room of rooms) {
            const lastMessage = await this.chatRepository.getLastMessage(room.roomId.toString())

            if (lastMessage) {
                const otherUserId = room.userId !== userId ? room.userId : room.otherUserId;

                if (otherUserId) {
                    const user = await this.usersRepository.findById(otherUserId.toString());
                    if (user) {

                        const formattedTime = formatDistanceToNowStrict(new Date(lastMessage.createdAt), { addSuffix: true })

                        const roomStatus = await this.chatRepository.getUserRoomStatus(userId, lastMessage.roomId);
                        const unreadCount = roomStatus?.unreadCount || 0;

                        usersWithLastMessage.push({
                            user: {
                                id: user.id,
                                name: user.name
                            },
                            roomId: lastMessage.roomId,
                            lastMessage: lastMessage.message,
                            lastMessageTime: formattedTime,
                            unreadCount: unreadCount
                        });
                    }
                }
            }
        }

        return usersWithLastMessage;
    }

    async getChatHistory(userId: string, otherUserId: string): Promise<any> {
        let roomId = await this.roomsService.createRoom({ userId, otherUserId });

        const chatHistory = await this.chatRepository.find(roomId);

        if (!chatHistory || chatHistory.length === 0) {
            return [];
        }

        const chatHistoryWithUser = await Promise.all(
            chatHistory.map(async (chat) => {
                let formattedDate = 'Unknown time';

                if (chat.createdAt) {
                    const date = new Date(chat.createdAt);
                    if (isValid(date)) {
                        formattedDate = formatDistanceToNowStrict(date, { addSuffix: true });
                    }
                }

                if (!chat.senderId) {
                    return {
                        ...chat.toObject(),
                        id: chat._id,
                        user: null,
                        formattedCreatedAt: formattedDate
                    };
                }

                const user = await this.usersRepository.findById(chat.senderId);

                return {
                    ...chat.toObject(),
                    id: chat._id,
                    user: user ? { id: user._id, name: user.name, email: user.email } : null,
                    formattedCreatedAt: formattedDate
                };
            })
        );

        return chatHistoryWithUser;
    }

    async createOrUpdateUserChatStatus(userId: string, roomId: string, isInroom: boolean) {
        const existingStatus = await this.chatRepository.findUserChatStatus(userId, roomId);
        if (!existingStatus) {
            await this.chatRepository.createOrUpdateUserChatStatus({ userId, roomId, isInroom });
        }
    }

    async updateIsInRoom(userId: string, roomId: string, isInroom: boolean) {
        return await this.chatRepository.updateIsInRoom(userId, roomId, isInroom);
    }

    async markMessagesAsRead(userId: string, roomId: string) {
        await this.chatRepository.updateReadCount(userId, roomId);
        return await this.chatRepository.readChatMessage(userId, roomId);
    }

    async getUserRoomStatus(receiverId: string, roomId: string) {
        return await this.chatRepository.getUserRoomStatus(receiverId, roomId);
    }

    async incrementUnreadCount(userId: string, roomId: string) {
        return this.chatRepository.incrementUnreadCount(userId, roomId);
    }
}