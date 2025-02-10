import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from "./auth.repository";
import { SignUpDto } from "./dto/signup.dto";
import { SignInDto } from "./dto/signin.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private jwtService: JwtService
    ) { }

    async signup(signUpDto: SignUpDto) {
        return await this.authRepository.create(signUpDto);
    }

    async signin(signInDto: SignInDto) {
        const user = await this.authRepository.findOne(signInDto);
        if (user) {
            const payload = { sub: user.id };
            const token = await this.jwtService.signAsync(payload);
            return {
                token: token,
                user: user
            }
        }

        throw new UnauthorizedException('Incorrect email or password');
    }
}