import { UserSchemaProps } from '@schemas/userSchema';
import { PointValue } from '@shared-with-ui/types';

export interface IdGenerator {
  generate: () => string;
  characters: (chars: string) => void;
}

export interface JoinSessionBody {
  sessionId: string;
  user: UserSchemaProps;
}

export interface StartSessionBody {
  user: UserSchemaProps;
  useRoles: boolean;
  pointValues: PointValue[];
  roles?: string[];
  usePermissions: boolean;
}

export interface LoadSessionParams {
  sessionId: string;
}

export interface LoadSessionQuery {
  userId: string;
}

export interface SessionInfoParams {
  sessionId: string;
}
