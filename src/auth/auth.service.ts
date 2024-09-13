import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { AuthDao } from "./auth.dao";
import { SignUpDto } from "./dto/signup.dto";
import { SignInDto } from "./dto/signin.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly authDao: AuthDao,
        private jwtService: JwtService
    ) { }

    async signup(signUpDto: SignUpDto) {
        return await this.authDao.create(signUpDto);
    }

    async signin(signInDto: SignInDto) {
        const user = await this.authDao.findOne(signInDto);
        if (user) {
            const payload = { sub: user.id };
            return await this.jwtService.signAsync(payload);
        }

        throw new UnauthorizedException('Incorrect email or password');
    }
}