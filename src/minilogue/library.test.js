import { serializeToString } from 'xmlserializer';
import { createLibraryFile } from './library';

describe('library', () => {
  beforeEach(() => {
    function construct() {
      this.serializeToString = serializeToString;
    }
    global.XMLSerializer = construct;
  });

  test('creating a library does not fail', () => {
    expect(createLibraryFile({ name: 'Test', programs: [] })).resolves.toBeTruthy();
  });
});
