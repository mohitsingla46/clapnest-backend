import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwt_secret } from '../utils/constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/users.schema';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwt_secret
                }
            );
            request['user'] = payload;
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            
            if (!requiredRoles) {
                return true;
            }

            const userRoles = await this.getUserRoles(payload.email);
            return requiredRoles.some((role) => userRoles.includes(role));
        } catch {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private async getUserRoles(email: string): Promise<string> {
        const user = await this.userModel.findOne({'email': email}).exec();
        return user ? user.role : '';
    }
}