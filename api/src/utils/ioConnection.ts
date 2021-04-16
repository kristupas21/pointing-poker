import http from 'http';
import { Server, Socket } from 'socket.io';
import WsService from '@services/wsService';
import logger from '@global/Logger';
import { WSHandshakeAuth } from '@shared-with-ui/types';

export function initIo(server: http.Server): void {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket: Socket) => {
    const { sessionId, userId } = socket.handshake.auth as WSHandshakeAuth;

    if (!sessionId) {
      throw new Error('Missing sessionId param in socket handshake auth');
    }

    if (!userId) {
      throw new Error('Missing userId param in socket handshake auth');
    }

    const wsService = new WsService(socket, sessionId);

    wsService.init();

    logger.info(`Socket connection initialized for user: ${userId}, session: ${sessionId}`);

    socket.on('disconnect', async () => {
      await wsService.destroy(userId);

      logger.info(`Socket connection closed for user: ${userId}, session: ${sessionId}`);
    });
  });
}
