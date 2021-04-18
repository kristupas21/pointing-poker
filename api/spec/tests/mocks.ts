import { UserSchemaProps } from '@schemas/userSchema';
import { PointValue } from '@shared-with-ui/types';
import { SessionSchemaProps } from '@schemas/sessionSchema';

export const MOCK_USER: UserSchemaProps = {
  id: 'chd-1',
  name: 'Chandler',
  avatarId: null,
};

export const MOCK_POINT_VALUES: PointValue[] = [
  { id: 'p', value: '1', pos: 0 },
  { id: 'p2', value: '2', pos: 1 },
];

export const MOCK_SESSION: SessionSchemaProps = {
  id: 'ss',
  currentTopic: '',
  usePermissions: false,
  useRoles: false,
  roles: [],
  pointValues: [],
  createdBy: 'uu',
  showVotes: false,
};
