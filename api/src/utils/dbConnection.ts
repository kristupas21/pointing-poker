import mongoose from 'mongoose';
import logger from '@global/Logger';

export async function dbConnect(): Promise<void> {
  await mongoose.connect(process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  );
  logger.info('Database connected');
}

export async function dbDisconnect(): Promise<void> {
  await mongoose.disconnect();
  logger.info('Database disconnected');
}
