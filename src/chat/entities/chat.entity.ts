import { Field, ID, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";
import { UserType } from "src/users/entities/users.entity";

export const ChatSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    senderId: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

export interface Chat extends mongoose.Document {
    id: String;
    roomId: string;
    senderId: string;
    message: string;
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
}

@ObjectType()
export class UserWithLastMessage {
    @Field(() => UserType)
    user: UserType;
  
    @Field()
    lastMessage: string;
  
    @Field()
    lastMessageTime: string;
  }