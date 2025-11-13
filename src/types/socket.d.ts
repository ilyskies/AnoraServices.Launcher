import { AnoraUser } from "./anora";

export interface SocketEventMap {
  connected: void;
  disconnected: { code: number; reason: string };
  error: { message: string; critical: boolean };

  user: AnoraUser;
  request_user: void;

  set_username: { newDisplayName: string };
  request_heartbeat: void;
}

export type SocketEvent = keyof SocketEventMap;
export type SocketEventType = keyof SocketEventMap;

export interface SocketMessage<T extends SocketEventType = SocketEventType> {
  type: T;
  data: SocketEventMap[T];
  timestamp: number;
  version: string;
}
