import { User } from 'types/global';
import { PointValue } from 'utils/pointValues/types';
import { createUser, normalizePointValues } from '../sessionUtils';
import { EMPTY_USER_ROLE } from '../sessionConstants';

describe('sessionUtils', () => {
  describe('createUser', () => {
    it('creates user object', () => {
      const props: Partial<User> = {
        id: 'u-id',
        name: 'UserName',
      };

      expect(createUser(props)).toEqual({
        id: 'u-id',
        name: 'UserName',
        role: EMPTY_USER_ROLE,
        isObserver: false,
      });
    });
  });

  describe('normalizePointValues', () => {
    it('removes duplicates & empty values & stores new positions', () => {
      const points: PointValue[] = [
        { id: '0', value: '18', pos: 0 },
        { id: '1', value: '18', pos: 1 },
        { id: '2', value: null, pos: 2 },
        { id: '3', value: '19', pos: 3 },
      ];

      expect(normalizePointValues(points)).toEqual([
        { id: '0', value: '18', pos: 0 },
        { id: '3', value: '19', pos: 1 },
      ]);
    });
  });
});
