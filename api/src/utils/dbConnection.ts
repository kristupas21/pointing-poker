import mongoose, { Mongoose } from 'mongoose';
import { Mockgoose } from 'mockgoose';
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

  private mockMongoose: Mockgoose;

  constructor() {
    this.mongoose = mongoose;
    this.mockMongoose = new Mockgoose(mongoose);
  }

  public async connect(): Promise<void> {
    if (this.isTestEnv) {
      await this.mockMongoose.prepareStorage();
    }

    await this.mongoose.connect(this.uri, options);

    logger.info(`${this.prefix}Database connected`);
  }

  public async disconnect(): Promise<void> {
    if (this.isTestEnv) {
      await this.mockMongoose.shutdown();
    }

    await this.mongoose.disconnect();

    logger.info(`${this.prefix}Database disconnected`);
  }
}

export default new DB();
