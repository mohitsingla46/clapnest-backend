import { IsNotEmpty, IsString } from "class-validator";

export class saveMessageDto {
    @IsNotEmpty()
    @IsString()
    readonly roomId: string;

    @IsNotEmpty()
    @IsString()
    readonly senderId: string;

    @IsNotEmpty()
    @IsString()
    readonly message: string;

}