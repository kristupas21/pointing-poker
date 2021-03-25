import { StorageService } from '../storageService';
import { StorageKey } from '../types';

describe('storageService', () => {
  const storageService = new StorageService();

  beforeEach(() => {
    storageService.clearState();
  });

  it('gets initial state as null', () => {
    expect(storageService.getState()).toEqual(null);
  });

  it('gets value as null if no key is present', () => {
    expect(storageService.get(StorageKey.Theme)).toEqual(null);
  });

  it('sets item value & returns it', () => {
    storageService.set(StorageKey.User, { id: 'u-id' });

    expect(storageService.get(StorageKey.User)).toEqual({ id: 'u-id' });
  });

  it('overrides item value if present', () => {
    storageService.set(StorageKey.User, { id: 'u-id', role: 'BE' });
    storageService.set(StorageKey.User, { id: 'new-u-id' });

    expect(storageService.get(StorageKey.User)).toEqual({ id: 'new-u-id' });
  });

  it('merges item value if present', () => {
    storageService.set(StorageKey.User, { id: 'u-id', role: 'BE' });
    storageService.set(StorageKey.User, { id: 'new-u-id' }, true);

    expect(storageService.get(StorageKey.User)).toEqual({ id: 'new-u-id', role: 'BE' });
  });

  it('removes item', () => {
    storageService.set(StorageKey.User, { id: 'u-id' });

    expect(storageService.get(StorageKey.User)).toEqual({ id: 'u-id' });

    storageService.remove(StorageKey.User);

    expect(storageService.get(StorageKey.User)).toEqual(null);
  });

  it('returns correct state object with different types of values', () => {
    storageService.set(StorageKey.User, { id: 'u-id' });
    storageService.set(StorageKey.Theme, 'DARK_THEME');
    storageService.set(StorageKey.Roles, [{ id: 'r' }]);
    storageService.set(StorageKey.PointValues, ['point']);

    expect(storageService.getState()).toEqual({
      [StorageKey.User]: { id: 'u-id', },
      [StorageKey.Theme]: 'DARK_THEME',
      [StorageKey.Roles]: [{ id: 'r' }],
      [StorageKey.PointValues]: ['point']
    });
  });
});
