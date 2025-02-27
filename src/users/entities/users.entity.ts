import { Field, ID, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";
import { Role } from "../../roles/entities/role.entity";

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: {
        id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Role' },
        name: { type: String, required: true }
    }
}, { timestamps: true });

export interface User extends mongoose.Document {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}

@ObjectType()
export class UserType {
    @Field(() => ID)
    id: string;

    @Field()
    readonly name: string;

    @Field()
    readonly email: string;

    @Field()
    readonly online: boolean;

    @Field({ nullable: true })
    lastSeen: Date | null;

    @Field({ nullable: true })
    formattedLastSeen: string | null;
}

@ObjectType()
export class AuthResponse {
    @Field()
    token: string;

    @Field(() => UserType)
    user: UserType;
}