import * as dotenv from 'dotenv';

dotenv.config();

export const jwt_secret = process.env.JWT_SECRET;

export const admin = 'ADMIN';
export const vendor = 'VENDOR';
export const user = 'USER';