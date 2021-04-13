import { SessionState } from 'state/session/sessionModel';
import { getDiffPartial } from './getDiffPartial';

describe('getDiffPartial', () => {
  it('gets correct diff object of same props', () => {
    const prevObject: SessionState = {
      currentSessionId: 'session-1',
      pointValues: [{ id: 'p', value: 'p', pos: 0 }],
      user: {
        name: 'User Name',
        id: 'u-id',
        role: null,
      },
      useRoles: false,
      roles: [{ id: 'r', name: 'r' }],
    };

    const newObject: SessionState = {
      currentSessionId: 'session-1',
      pointValues: [],
      user: {
        name: 'User Name 2',
        id: 'u-id',
        role: null,
      },
      useRoles: true,
      roles: [{ id: 'r', name: 'r' }],
    };

    expect(getDiffPartial(prevObject, newObject)).toEqual({
      pointValues: [],
      user: {
        name: 'User Name 2',
        id: 'u-id',
        role: null,
      },
      useRoles: true,
    });
  });

  it('gets correct diff object of dynamic props', () => {
    const prevObject = {
      num1: 1,
      num2: 2,
      string1: 'string1',
      string2: 'string2',
      object1: {
        value: 'object1Value',
      },
      object2: {
        value: 'object2Value',
      },
      object3: {
        value: 'object3Value',
      },
      array1: [
        { id: 'array1Id' },
      ],
      array2: [
        { id: 'array2Id' },
      ],
      bool1: true,
      bool2: false,
    };

    const newObject = {
      num1: 1,
      num2: 200,
      string2: 'CHANGED',
      string3: 'ADDED',
      object1: {
        value: 'object1Value',
        added: 'ADDED',
      },
      object2: {
        value: 'CHANGED',
      },
      object3: {
        value: 'object3Value',
      },
      object4: {
        value: 'object4value',
      },
      array1: [
        { id: 'array1Id' },
      ],
      array2: [
        { id: 'array2Id', added: 'ADDED' },
      ],
      bool1: true,
      bool2: true,
    } as any;

    expect(getDiffPartial(prevObject, newObject)).toEqual({
      num2: 200,
      string2: 'CHANGED',
      string3: 'ADDED',
      object1: {
        value: 'object1Value',
        added: 'ADDED',
      },
      object2: {
        value: 'CHANGED',
      },
      object4: {
        value: 'object4value',
      },
      array2: [
        { id: 'array2Id', added: 'ADDED' },
      ],
      bool2: true,
    });
  });
});
