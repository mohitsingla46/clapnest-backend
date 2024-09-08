import { HttpStatus, Injectable, Request, UnauthorizedException } from "@nestjs/common";
import { User } from "./schemas/users.schema";
import { JwtService } from '@nestjs/jwt';
import { AuthDao } from "./auth.dao";
import { ResponseService } from "../common/services/response.service";
import { ResponseDto } from "../common/dto/response.dto";

@Injectable({})
export class AuthService {
    constructor(
        private readonly authDao: AuthDao,
        private jwtService: JwtService,
        private readonly responseService: ResponseService,
    ) { }

    async signup(user: User): Promise<ResponseDto<any>> {
        try {
            const userCreated = await this.authDao.create(user);
            return this.responseService.success(userCreated);
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async signin(email: string, password: string): Promise<ResponseDto<any>> {
        try {
            const user = await this.authDao.findOne(email, password);
            if (user) {
                const payload = { name: user.name, email: user.email };
                const token = await this.jwtService.signAsync(payload);
                return this.responseService.success({ token: token });
            }

            throw new UnauthorizedException('Invalid credentials');
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getProfile(@Request() req): Promise<ResponseDto<any>> {
        try {
            const user = req.user;
            return this.responseService.success(user);
        }
        catch (error) {
            return this.responseService.error(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}