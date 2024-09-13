import { Injectable } from "@nestjs/common";
import { ChatDao } from "./chat.dao";
import { saveMessageDto } from "./dto/save-message.dto";

@Injectable()
export class ChatService {
    constructor(
        private readonly chatDao: ChatDao
    ) { }

    async saveMessage(newMessage: saveMessageDto) {
        return await this.chatDao.create(newMessage);
    }


}