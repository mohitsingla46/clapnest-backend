import { Injectable } from "@nestjs/common";
import { RoomsDao } from "./rooms.dao";
import { CreateRoomDto } from "./dto/create-room.dto";

@Injectable()
export class RoomsService {
    constructor(
        private readonly roomsDao: RoomsDao
    ) { }

    async createRoom(newRoom: CreateRoomDto) {
        const roomId = await this.generateRoomId(newRoom.userId, newRoom.otherUserId);

        let room = await this.roomsDao.findRoomByRoomId(roomId);
        if (!room) {
            room = await this.roomsDao.create(newRoom.userId, newRoom.otherUserId, roomId);
        }

        return room;
    }

    async generateRoomId(userId: string, otherUserId: string): Promise<string> {
        const sortedUserIds = [userId, otherUserId].sort();
        return `${sortedUserIds[0]}_${sortedUserIds[1]}`;
    }
}