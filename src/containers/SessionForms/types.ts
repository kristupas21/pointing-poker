export interface SessionFormData {
  isObserver: boolean;
  name: string;
  role?: string;
  sessionId?: string;
  useRoles?: boolean;
}

export interface StorageFormData extends SessionFormData {
  roleName?: string;
}
