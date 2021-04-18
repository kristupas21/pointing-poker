import UserService from '@services/userService';
import db from '@utils/dbConnection';
import { MOCK_USER } from '../mocks';

describe('userService', () => {
  const userService = new UserService();

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it('executes removeUser method', async () => {
    const res = await userService.removeUser('s', 'u');
    expect(res).toEqual(null);
  });

  it('executes setUserVoteValue method', async () => {
    const res = await userService.setUserVoteValue('s', 'u', '3');
    expect(res).toEqual(undefined);
  });

  it('executes modifyUser method', async () => {
    const res = await userService.modifyUser('s', 'u', { name: 'K' });
    expect(res).toEqual(null);
  });

  it('executes clearAllVoteValues method', async () => {
    const res = await userService.clearAllVoteValues('s');
    expect(res).toEqual(undefined);
  });

  it('executes updateAllUserPermissions method', async () => {
    const res = await userService.updateAllUserPermissions('s', true);
    expect(res).toEqual(undefined);
  });

  it('executes getUserById method', async () => {
    const res = await userService.getUserById('s', 'u');
    expect(res).toEqual(null);
  });

  it('executes userNameExists method', async () => {
    const res = await userService.userNameExists('s', 'n');
    expect(typeof res).toEqual('boolean');
  });

  it('executes getAllSessionUsers method', async () => {
    const res = await userService.getAllSessionUsers('s');
    expect(Array.isArray(res)).toEqual(true);
  });

  it('executes anyUserRegisteredToSession method', async () => {
    const res = await userService.anyUserRegisteredToSession('s');
    expect(typeof res).toEqual('boolean');
  });

  it('executes registerUser method', async () => {
    const res = await userService.registerUser('s', MOCK_USER, true);

    expect(typeof res).toEqual('object');
  });
});
