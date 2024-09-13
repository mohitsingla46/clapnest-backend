import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { UserType } from "./entities/users.entity";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
    constructor(
        private usersService: UsersService
    ) { }

    @Query(() => UserType)
    @UseGuards(AuthGuard)
    async getprofile(@Context() context) {
        const userId = context.req.user.sub;
        return await this.usersService.getprofile(userId);
    }

    @Query(() => UserType)
    @UseGuards(AuthGuard)
    async getUserDetail(@Args('id') id: string) {
        return await this.usersService.getprofile(id);
    }

    @Query(() => [UserType])
    @UseGuards(AuthGuard)
    async getChatUsers(@Context() context) {
        const userId = context.req.user.sub;
        return await this.usersService.getChatUsers(userId);
    }
}