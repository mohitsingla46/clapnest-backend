import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';

@Injectable()
export class ResponseService {
    success<T>(data: T, message = 'Success'): ResponseDto<T> {
        return {
            status: 200,
            data,
            message,
        };
    }

    error(error: string, status = 400): ResponseDto<null> {
        return {
            status,
            error,
        };
    }
}