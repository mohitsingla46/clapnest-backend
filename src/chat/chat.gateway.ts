import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
        client.emit('connected', `You are connected! Your client ID is ${client.id}`);
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(client: Socket, payload: { userId: string, roomName: string }) {
        client.join(payload.roomName);
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: { userId: string, roomName: string, message: string }) {
        this.server.to(payload.roomName).emit('message', payload);
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }
}