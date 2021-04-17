import mongoose, { Mongoose } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from '@global/Logger';

const options = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

class DB {
  private isTestEnv = process.env.NODE_ENV === 'test';

  private uri = process.env.DB_URI;

  private prefix = this.isTestEnv ? 'Mock ' : '';

  private mongoose: Mongoose;

  private memoryServer: MongoMemoryServer;

  constructor() {
    this.mongoose = mongoose;
    this.memoryServer = new MongoMemoryServer();
  }

  public async connect(): Promise<void> {
    if (this.isTestEnv) {
      const mockUri = await this.memoryServer.getUri();
      await this.mongoose.connect(mockUri, options);
    } else {
      await this.mongoose.connect(this.uri, options);
    }

    logger.info(`${this.prefix}Database connected`);
  }

  public async disconnect(): Promise<void> {
    if (this.isTestEnv) {
      await this.memoryServer.stop();
    }

    await this.mongoose.disconnect();

    logger.info(`${this.prefix}Database disconnected`);
  }
}

export default new DB();
