import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { RoomsService } from "../rooms/rooms.service";
import { UsersService } from "../users/users.service";
import { formatDistanceToNow } from "date-fns";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(
        private roomsService: RoomsService,
        private chatService: ChatService,
        private userService: UsersService
    ) { }

    async handleConnection(client: Socket) {
        const userId = client.handshake.query.userId as string;

        if (!userId) {
            console.warn(`Client ${client.id} connected without userId.`);
            client.emit('error', 'userId is required for connection');
            return;
        }

        try {
            await this.userService.updateUserStatus(userId, true, null);
            client.emit('connected', `You are connected! Your client ID is ${client.id}`);
            this.server.emit('userStatusUpdate', { userId, online: true, lastSeen: null });
            client.emit('userStatusUpdate', { userId, online: true, lastSeen: null });
        } catch (error) {
            console.error(`Error updating user status for ${userId}:`, error);
            client.emit('error', 'Unable to update user status');
        }
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(client: Socket, payload: { userId: string, otherUserId: string }) {
        const roomId = await this.roomsService.createRoom(payload);
        client.join(roomId);
        client.emit('roomJoined', { roomId: roomId, message: `Joined room: ${roomId}` });
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, payload: { roomId: string }) {
        client.leave(payload.roomId);
    }

    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: { senderId: string, roomId: string, message: string }) {
        await this.chatService.saveMessage(payload);
        this.server.to(payload.roomId).emit('message', payload);
    }

    async handleDisconnect(client: Socket) {
        const userId = client.handshake.query.userId as string;
        try {
            const lastSeen = new Date();
            const formattedLastSeen = formatDistanceToNow(new Date(lastSeen), { addSuffix: true });
            await this.userService.updateUserStatus(userId, false, lastSeen);
            this.server.emit('userStatusUpdate', { userId, online: false, formattedLastSeen });
            client.emit('userStatusUpdate', { userId, online: false, formattedLastSeen });
        } catch (error) {
            console.error(`Error updating user status on disconnect for ${userId}:`, error);
        }
    }
}