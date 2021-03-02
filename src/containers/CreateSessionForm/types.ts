export interface CreateSessionFormData {
  sessionId?: string;
  name: string;
  role?: string;
  isObserver: boolean;
  useRoles?: boolean;
}
