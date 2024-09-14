import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { RoomsService } from "src/rooms/rooms.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(
        private roomsService: RoomsService,
        private chatService: ChatService
    ) { }

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
        client.emit('connected', `You are connected! Your client ID is ${client.id}`);
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(client: Socket, payload: { userId: string, otherUserId: string }) {
        const roomId = await this.roomsService.createRoom(payload);
        client.join(roomId);
        client.emit('roomJoined', { roomId: roomId, message: `Joined room: ${roomId}` });
    }

    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: { senderId: string, roomId: string, message: string }) {
        await this.chatService.saveMessage(payload);
        this.server.to(payload.roomId).emit('message', payload);
    }

    async handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }
}