import http from 'http';
import { Server, Socket } from 'socket.io';
import WsService from '@services/wsService';
import logger from '@global/Logger';

export function initIo(server: http.Server): void {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket: Socket) => {
    const { sessionId, userId } = socket.handshake.auth;

    if (!sessionId || !userId) {
      const params = [
        `${sessionId ? '' : 'sessionId'}`,
        `${userId ? '' : 'userId'}`
      ].map((p) => p).join(', ');

      throw new Error(`Missing params in socket connection: ${params}`);
    }

    const wsService = new WsService(socket, sessionId);

    wsService.init();

    logger.info(`Socket connection initialized for user: ${userId as string}`);

    socket.on('disconnect', async () => {
      await wsService.destroy(userId);

      logger.info(`Socket connection closed for user: ${userId as string}`);
    });
  });
}
