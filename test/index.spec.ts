import * as index from '../src/index';

describe('Index', () => {
  test('should return 6 exports', () => {
    expect(Object.keys(index)).toHaveLength(6);
  });
});