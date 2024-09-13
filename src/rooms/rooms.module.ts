import { Module } from "@nestjs/common";
import { RoomsResolver } from "./rooms.resolver";
import { RoomsService } from "./rooms.service";
import { RoomsDao } from "./rooms.dao";
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
    providers: [RoomsResolver, RoomsService, RoomsDao]
})

export class RoomsModule { }