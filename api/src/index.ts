import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@global/Logger';
import db from '@utils/dbConnection';
import { initIo } from '@utils/ioConnection';

void (async () => {
  await db.connect();

  const port = Number(process.env.PORT);
  const server = app.listen(port, () => {
    logger.info(`Express server started on port: ${port}`);
  });

  initIo(server);
})();


