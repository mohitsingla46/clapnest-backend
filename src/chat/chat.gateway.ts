import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    handleConnection(client: Socket) {
        console.log("A device connected");
        
    }

    handleDisconnect(client: Socket) {
        console.log("A device disconnected");
    }

}