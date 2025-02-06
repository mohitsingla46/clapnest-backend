import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat } from "./entities/chat.entity";
import { Model } from "mongoose";
import { UserChatStatus } from "./entities/user-chat-status.entity";

@Injectable()
export class ChatDao {
    constructor(
        @InjectModel('Chat') private chatModel: Model<Chat>,
        @InjectModel('UserChatStatus') private userChatStatusModel: Model<UserChatStatus>
    ) { }

    async create(newMessage: { senderId: string, roomId: string, message: string }) {
        const chat = new this.chatModel({
            roomId: newMessage.roomId,
            senderId: newMessage.senderId,
            message: newMessage.message
        });

        return await chat.save();
    }

    async getLastMessage(roomId: string) {
        return await this.chatModel
            .findOne({ roomId: roomId })
            .sort({ _id: -1 })
            .exec();
    }

    async find(roomId: string) {
        return await this.chatModel.find({ roomId: roomId }).exec();
    }

    async findUserChatStatus(userId: string, roomId: string) {
        return await this.userChatStatusModel.findOne({ userId, roomId }).exec();
    }

    async createOrUpdateUserChatStatus(data: {
        userId: string;
        roomId: string;
        isInroom: boolean;
        unreadCount?: number;
    }) {
        return await this.userChatStatusModel.findOneAndUpdate(
            { userId: data.userId, roomId: data.roomId },
            {
                $set: {
                    unreadCount: data.unreadCount ?? 0,
                    isInroom: data.isInroom,
                },
            },
            { upsert: true, new: true }
        );
    }

    async updateIsInRoom(userId: string, roomId: string, isInroom: boolean) {
        return await this.userChatStatusModel.updateOne(
            { userId: userId, roomId: roomId },
            { $set: { isInroom: isInroom } }
        );
    }

    async readChatMessage(userId: string, roomId: string) {
        return await this.chatModel.updateMany(
            { roomId: roomId, read: false, senderId: { $ne: userId } },
            { $set: { read: true } }
        );
    }
}