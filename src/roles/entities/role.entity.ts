import { Field, ID, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";

export const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

export interface Role extends mongoose.Document {
    name: string;
}

@ObjectType()
export class RoleType {
    @Field(() => ID)
    id: string;

    @Field()
    readonly name: string;
}