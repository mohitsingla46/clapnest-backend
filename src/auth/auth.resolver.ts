import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserType } from "./entities/users.entity";
import { SigninInput, SignupInput } from "./inputs/user.input";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => UserType)
    async signup(@Args('input') input: SignupInput) {
        return await this.authService.signup(input);
    }

    @Mutation(() => String)
    async signin(@Args('input') input: SigninInput) {
        return await this.authService.signin(input);
    }

    @Query(() => UserType)
    @UseGuards(AuthGuard)
    async getprofile(@Context() context) {
        const userId = context.req.user.sub;
        return await this.authService.getprofile(userId);
    }

    @Query(() => UserType)
    @UseGuards(AuthGuard)
    async getUserDetail(@Args('id') id: string) {
        return await this.authService.getprofile(id);
    }
}