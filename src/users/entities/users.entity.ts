import { Field, ID, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";
import { Role, RoleType } from "../../roles/entities/role.entity";

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
    readonly password: string;

    @Field(() => RoleType)
    readonly role: RoleType;
}