import { Injectable } from "@nestjs/common";
import { RoomsDao } from "./rooms.dao";

@Injectable()
export class RoomsService {
    constructor(
        private readonly roomsDao: RoomsDao
    ) { }

    async createRoom(payload: { userId: string, otherUserId: string }) {
        const roomId = await this.generateRoomId(payload.userId, payload.otherUserId);

        let roomExist = await this.roomsDao.findRoomByRoomId(roomId);
        if (!roomExist) {
            await this.roomsDao.create(payload.userId, payload.otherUserId, roomId);
        }

        return roomId;
    }

    async generateRoomId(userId: string, otherUserId: string): Promise<string> {
        const sortedUserIds = [userId, otherUserId].sort();
        return `${sortedUserIds[0]}_${sortedUserIds[1]}`;
    }
}