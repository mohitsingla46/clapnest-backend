import { Injectable } from "@nestjs/common";
import { RoomsRepository } from "./rooms.repository";

@Injectable()
export class RoomsService {
    constructor(
        private readonly roomsRepository: RoomsRepository
    ) { }

    async createRoom(payload: { userId: string, otherUserId: string }) {
        const roomId = await this.generateRoomId(payload.userId, payload.otherUserId);

        let roomExist = await this.roomsRepository.findRoomByRoomId(roomId);
        if (!roomExist) {
            await this.roomsRepository.create(payload.userId, payload.otherUserId, roomId);
        }

        return roomId;
    }

    async generateRoomId(userId: string, otherUserId: string): Promise<string> {
        const sortedUserIds = [userId, otherUserId].sort();
        return `${sortedUserIds[0]}_${sortedUserIds[1]}`;
    }

    async getRoomById(roomId: string) {
        return await this.roomsRepository.findRoomByRoomId(roomId);
    }
}