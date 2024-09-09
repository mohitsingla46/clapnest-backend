import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto{
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly role: string;
}