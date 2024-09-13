import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat } from "./entities/chat.entity";
import { saveMessageDto } from "./dto/save-message.dto";
import { Model } from "mongoose";

@Injectable()
export class ChatDao {
    constructor(
        @InjectModel('Chat') private chatModel: Model<Chat>,
    ) { }

    async create(newMessage: saveMessageDto) {
        const chat = new this.chatModel({
            roomId: newMessage.roomId,
            senderId: newMessage.senderId,
            message: newMessage.message
        });

        return await chat.save();
    }

    
}