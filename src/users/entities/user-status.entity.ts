import { Field, ID, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";

export const UserStatusSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    online: { type: Boolean, required: true, default: false },
    lastSeen: { type: Date, default: null },
    lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

export interface UserStatus extends mongoose.Document {
    userId: string;
    online: boolean;
    lastSeen: Date | null;
    lastUpdated: Date;
}

@ObjectType()
export class UserStatusType {
    @Field(() => ID)
    userId: string;

    @Field()
    online: boolean;

    @Field({ nullable: true })
    lastSeen: Date | null;

    @Field({ nullable: true })
    formattedLastSeen: string | null;

    @Field()
    lastUpdated: Date;
}
