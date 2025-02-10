import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwt_secret } from '../utils/constants';
import { AuthRepository } from './auth.repository';
import { AuthResolver } from './auth.resolver';
import { RoleSchema } from '../roles/entities/role.entity';
import { UserSchema } from '../users/entities/users.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "User", schema: UserSchema
            },
            {
                name: "Role", schema: RoleSchema,
            }
        ]),
        JwtModule.register({
            global: true,
            secret: jwt_secret,
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthResolver, AuthRepository, AuthService]
})
export class AuthModule {}
