import { calcClosestPoint } from '../mathOps';
import { DEFAULT_POINT_VALUES } from '../pointValues/constants';

describe('mathOps', () => {
  describe('calcClosestPoint', () => {
    const pointValues = DEFAULT_POINT_VALUES;

    it('calculates closest point', () => {
      const argsMap = [
        { avg: '1', closest: '1' },
        { avg: '1.49', closest: '1' },
        { avg: '1.5', closest: '2' },
        { avg: '4', closest: '5' },
        { avg: '11', closest: '13' },
        { avg: '32', closest: '40' },
        { avg: '150', closest: '100' },
        { avg: null, closest: '0' },
      ];

      argsMap.forEach((item) => {
        expect(calcClosestPoint(item.avg, pointValues)).toEqual(item.closest);
      });
    });
  });
});
