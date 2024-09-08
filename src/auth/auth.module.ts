import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwt_secret } from '../utils/constants';
import { AuthDao } from './auth.dao';
import { ResponseService } from '../common/services/response.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        JwtModule.register({
            global: true,
            secret: jwt_secret,
            signOptions: { expiresIn: '60m' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthDao, AuthService, ResponseService]
})
export class AuthModule {}
