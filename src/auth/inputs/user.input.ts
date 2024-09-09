import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SignupInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    role: string;
}

@InputType()
export class SigninInput {
    @Field()
    email: string;

    @Field()
    password: string;
}