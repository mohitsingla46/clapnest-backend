import { Injectable } from "@nestjs/common";
import { ChatDao } from "./chat.dao";
import { saveMessageDto } from "./dto/save-message.dto";
import { RoomsDao } from "../rooms/rooms.dao";
import { UsersDao } from "../users/users.dao";
import { formatDistanceToNowStrict } from "date-fns";

@Injectable()
export class ChatService {
    constructor(
        private readonly roomsDao: RoomsDao,
        private readonly chatDao: ChatDao,
        private readonly usersDao: UsersDao,
    ) { }

    async saveMessage(payload: { senderId: string, roomId: string, message: string }) {
        return await this.chatDao.create(payload);
    }

    async getChats(userId: string) {
        const rooms = await this.roomsDao.getRoomsByUserId(userId);

        const usersWithLastMessage = [];

        for (const room of rooms) {
            const lastMessage = await this.chatDao.getLastMessage(room.roomId.toString())

            if (lastMessage) {
                const otherUserId = room.userId !== userId ? room.userId : room.otherUserId;

                if (otherUserId) {
                    const user = await this.usersDao.findById(otherUserId.toString());
                    if (user) {

                        const formattedTime = formatDistanceToNowStrict(new Date(lastMessage.createdAt), { addSuffix: true })

                        usersWithLastMessage.push({
                            user: {
                                id: user.id,
                                name: user.name
                            },
                            roomId: lastMessage.roomId,
                            lastMessage: lastMessage.message,
                            lastMessageTime: formattedTime
                        });
                    }
                }
            }
        }

        return usersWithLastMessage;
    }

    async getChatHistory(roomId: string): Promise<any[]> {
        const chatHistory = await this.chatDao.find(roomId);

        if (!chatHistory || chatHistory.length === 0) {
            return [];
        }

        const chatHistoryWithUser = await Promise.all(
            chatHistory.map(async (chat) => {

                if (!chat.senderId) {
                    return { ...chat.toObject(), user: null };
                }

                const user = await this.usersDao.findById(chat.senderId);

                return {
                    ...chat.toObject(),
                    user: user || null,
                };
            })
        );

        return chatHistoryWithUser;
    }
}