import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwt_secret } from '../utils/constants';
import { AuthDao } from './auth.dao';
import { AuthResolver } from './auth.resolver';
import { UserSchema } from './entities/users.entity';
import { RoleSchema } from 'src/roles/entities/role.entity';

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
    providers: [AuthResolver, AuthDao, AuthService]
})
export class AuthModule {}
