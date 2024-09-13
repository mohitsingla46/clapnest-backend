import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { RoomType } from "./entities/rooms.entity";
import { CreateRoomInput } from "./inputs/room.input";
import { RoomsService } from "./rooms.service";
import { AuthGuard } from "src/auth/auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class RoomsResolver {
    constructor(
        private roomsService: RoomsService
    ) { }

    @Mutation(() => RoomType)
    @UseGuards(AuthGuard)
    async createRoom(@Args('input') input: CreateRoomInput){
        return await this.roomsService.createRoom(input);
    }
}