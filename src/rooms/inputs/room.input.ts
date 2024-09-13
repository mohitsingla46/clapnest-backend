import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateRoomInput {
    @Field()
    userId: string;

    @Field()
    otherUserId: string;
}