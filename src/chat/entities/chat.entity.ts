import { Field, ID, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";
import { UserType } from "../../users/entities/users.entity";

export const ChatSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    senderId: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

export interface Chat extends mongoose.Document {
    id: String;
    roomId: string;
    senderId: string;
    message: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
}

@ObjectType()
export class ChatType {
    @Field(() => ID)
    id: String;

    @Field()
    roomId: String;

    @Field()
    senderId: String;

    @Field()
    message: String;

    @Field()
    read: boolean;

    @Field()
    createdAt: Date;

    @Field()
    formattedCreatedAt: String;

    @Field(() => UserType, { nullable: true })
    user?: UserType;
}

@ObjectType()
export class UserWithLastMessage {
    @Field(() => UserType)
    user: UserType;

    @Field()
    roomId: string;

    @Field()
    lastMessage: string;

    @Field()
    lastMessageTime: string;

    @Field()
    unreadCount: number;
}