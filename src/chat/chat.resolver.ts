import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ChatService } from "./chat.service";
import { ChatType, UserWithLastMessage } from "./entities/chat.entity";
import { CreateChatInput } from "./inputs/chat.input";
import { AuthGuard } from "../auth/auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class ChatResolver {
    constructor(
        private chatService: ChatService
    ) { }

    @Mutation(() => ChatType)
    @UseGuards(AuthGuard)
    async saveMessage(@Args('input') input: CreateChatInput) {
        return await this.chatService.saveMessage(input);
    }

    @Query(() => [UserWithLastMessage])
    @UseGuards(AuthGuard)
    async getChats(@Context() context) {
        const userId = context.req.user.sub;
        return await this.chatService.getChats(userId);
    }

    @Query(() => [ChatType])
    @UseGuards(AuthGuard)
    async getChatHistory(@Args('roomId') roomId: string) {
        return await this.chatService.getChatHistory(roomId);
    }

}