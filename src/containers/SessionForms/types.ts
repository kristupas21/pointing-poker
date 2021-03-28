export interface SessionFormData {
  isObserver: boolean;
  name: string;
  role?: string;
  sessionId?: string;
  useRoles?: boolean;
}

export type SessionFormSubmitHandler = (
  values: SessionFormData, setSubmitting: (status: boolean) => void
) => void;
