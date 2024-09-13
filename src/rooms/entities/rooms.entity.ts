import { Field, ID, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";

export const RoomSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    otherUserId: { type: String, required: true },
    roomId: { type: String, required: true }
}, { timestamps: true });

export interface Room extends mongoose.Document {
    id: String;
    userId: String;
    otherUserId: String;
    roomId: String;
}

@ObjectType()
export class RoomType {
    @Field(() => ID)
    id: String;

    @Field()
    userId: String;

    @Field()
    otherUserId: String;

    @Field()
    roomId: String;
}