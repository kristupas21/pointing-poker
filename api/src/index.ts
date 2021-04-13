import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@global/Logger';
import { dbConnect } from './utils/dbConnection';
import { initIo } from './utils/ioConnection';

void (async () => {
  await dbConnect();

  const port = Number(process.env.PORT || 9000);
  const server = app.listen(port, () => {
    logger.info(`Express server started on port: ${port}`);
  });

  initIo(server);
})();


