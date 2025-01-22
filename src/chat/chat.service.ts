import { Injectable } from "@nestjs/common";
import { ChatDao } from "./chat.dao";
import { saveMessageDto } from "./dto/save-message.dto";
import { RoomsDao } from "../rooms/rooms.dao";
import { UsersDao } from "../users/users.dao";
import { formatDistanceToNowStrict } from "date-fns";
import { RoomsService } from "../rooms/rooms.service";

@Injectable()
export class ChatService {
    constructor(
        private readonly roomsDao: RoomsDao,
        private readonly chatDao: ChatDao,
        private readonly usersDao: UsersDao,
        private readonly roomsService: RoomsService,
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

    async getChatHistory(userId: string, otherUserId: string): Promise<any> {
        let roomId = await this.roomsService.createRoom({ userId, otherUserId });

        const chatHistory = await this.chatDao.find(roomId);

        if (!chatHistory || chatHistory.length === 0) {
            return [];
        }

        const chatHistoryWithUser = await Promise.all(
            chatHistory.map(async (chat) => {
                if (!chat.senderId) {
                    return { ...chat.toObject(), id: chat._id, user: null };
                }

                const user = await this.usersDao.findById(chat.senderId);

                return {
                    ...chat.toObject(),
                    id: chat._id,
                    user: user ? { id: user._id, name: user.name, email: user.email } : null,
                };
            })
        );
        console.log(chatHistoryWithUser);
        

        return chatHistoryWithUser;
    }
}