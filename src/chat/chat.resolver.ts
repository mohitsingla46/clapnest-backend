import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { UserType } from "src/auth/entities/users.entity";
import { ChatService } from "./chat.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthService } from "src/auth/auth.service";

@Resolver()
export class ChatResolver {
    constructor(
        private chatService: ChatService
    ) { }

    @Query(() => [UserType])
    @UseGuards(AuthGuard)
    async getUsers(@Context() context) {
        const userId = context.req.user.sub;
        return await this.chatService.getUsers(userId);
    }
}