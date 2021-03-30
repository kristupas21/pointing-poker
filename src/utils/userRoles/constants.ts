import { v4 as uuidv4 } from 'uuid';
import { UserRole } from './types';

export const DEFAULT_USER_ROLES: UserRole[] = [
  { name: 'Backend', id: uuidv4() },
  { name: 'Frontend', id: uuidv4() },
  { name: 'QA', id: uuidv4() },
  { name: 'Other', id: uuidv4() },
];
