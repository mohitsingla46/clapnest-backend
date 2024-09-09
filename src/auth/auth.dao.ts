import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignUpDto } from "./dto/signup.dto";
import { User } from "./entities/users.entity";
import { Role } from "../roles/entities/role.entity";
import { SignInDto } from "./dto/signin.dto";

@Injectable()
export class AuthDao {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('Role') private roleModel: Model<Role>
    ) { }

    async create(newUser: SignUpDto) {
        const role = await this.roleModel.findById(newUser.role);

        const userToAdd = new this.userModel({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            role: {
                id: role.id,
                name: role.name
            }
        });

        return await userToAdd.save();
    }

    async findOne(user: SignInDto) {
        return await this.userModel.findOne({ 'email': user.email, 'password': user.password });
    }

    async findById(id: string) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}