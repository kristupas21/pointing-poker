import mongoose from 'mongoose';
import logger from '@global/Logger';

const uri = process.env.DB_URI || 'mongodb://localhost/pp';

export async function dbConnect(): Promise<void> {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  logger.info('Database connected');
}

export async function dbDisconnect(): Promise<void> {
  await mongoose.disconnect();
  logger.info('Database disconnected');
}
