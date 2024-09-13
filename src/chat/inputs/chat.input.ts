import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateChatInput {
    @Field()
    roomId: string;

    @Field()
    senderId: string;

    @Field()
    message: string;
}