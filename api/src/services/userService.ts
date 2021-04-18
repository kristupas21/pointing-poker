import User, { UserSchema, UserSchemaProps } from '@schemas/userSchema';

class UserService {
  public async removeUser(sessionId: string, userId: string): Promise<UserSchema> {
    return User.findOneAndDelete({ id: userId, sessionId }).lean();
  }

  public async setUserVoteValue(sessionId: string, userId: string, voteValue: string): Promise<void> {
    await User.findOneAndUpdate({ id: userId, sessionId }, { voteValue });
  }

  public async modifyUser(sessionId: string, userId: string, params: Partial<UserSchemaProps>): Promise<UserSchema> {
    return User.findOneAndUpdate({ id: userId, sessionId }, params, { new: true }).lean();
  }

  public async clearAllVoteValues(sessionId: string): Promise<void> {
    await User.updateMany({ sessionId }, { voteValue: null });
  }

  public async updateAllUserPermissions(sessionId: string, hasPermission: boolean): Promise<void> {
    await User.updateMany({ sessionId }, { hasPermission });
  }

  public async getUserById(sessionId: string, id: string): Promise<UserSchema> {
    return User.findOne({ sessionId, id }).lean();
  }

  public async userNameExists(sessionId: string, name: string): Promise<boolean> {
    return User.exists({ sessionId, name });
  }

  public async registerUser(sessionId: string, user: UserSchemaProps, hasPermission: boolean): Promise<UserSchemaProps> {
    const filter = { id: user.id, sessionId };
    const userParams = { ...user, sessionId, hasPermission };

    return User.updateOne(filter, userParams, { upsert: true, new: true }).lean();
  }

  public async getAllSessionUsers(sessionId: string): Promise<UserSchema[]> {
    return User.find({ sessionId }).lean();
  }

  public async anyUserRegisteredToSession(sessionId: string): Promise<boolean> {
    return User.exists({ sessionId });
  }
}

export default UserService;
