export class ResponseDto<T> {
    status: number;
    data?: T;
    message?: string;
    error?: string;
}