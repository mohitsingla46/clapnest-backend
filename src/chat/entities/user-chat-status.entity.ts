import { Field, ID, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";

export const UserChatStatusSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    roomId: { type: mongoose.Schema.Types.String, required: true },
    unreadCount: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

export interface UserChatStatus extends mongoose.Document {
    userId: string;
    roomId: string;
    unreadCount: number;
    lastUpdated: Date;
}

@ObjectType()
export class UserChatStatusType {
    @Field(() => ID)
    userId: string;

    @Field(() => ID)
    roomId: string;

    @Field()
    unreadCount: number;

    @Field()
    lastUpdated: Date;
}
