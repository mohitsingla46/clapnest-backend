import { Module } from "@nestjs/common";
import { RoomsResolver } from "./rooms.resolver";
import { RoomsService } from "./rooms.service";
import { RoomsRepository } from "./rooms.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomSchema } from "./entities/rooms.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "Room", schema: RoomSchema,
            }
        ])
    ],
    providers: [RoomsResolver, RoomsService, RoomsRepository]
})

export class RoomsModule { }