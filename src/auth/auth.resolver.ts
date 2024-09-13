import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { SigninInput, SignupInput } from "./inputs/user.input";
import { UserType } from "src/users/entities/users.entity";

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
}