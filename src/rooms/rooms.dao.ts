import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Room } from "./entities/rooms.entity";

@Injectable()

export class RoomsDao {
    constructor(
        @InjectModel('Room') private roomModel: Model<Room>
    ) { }

    async create(userId: string, otherUserId: string, roomId: string) {
        const room = new this.roomModel({
            userId: userId,
            otherUserId: otherUserId,
            roomId: roomId
        });

        return await room.save();
    }

    async findRoomByRoomId(roomId: string) {
        return await this.roomModel.findOne({ roomId: roomId });
    }
}