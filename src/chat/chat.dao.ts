import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat } from "./entities/chat.entity";
import { Model } from "mongoose";

@Injectable()
export class ChatDao {
    constructor(
        @InjectModel('Chat') private chatModel: Model<Chat>
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

}