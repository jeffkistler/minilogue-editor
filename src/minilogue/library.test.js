import { serializeToString } from 'xmlserializer';
import { createLibraryFile, createPresetFile, createProgramFile } from './library';
import { INIT_PROGRAM } from './program';

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

  test('creating a preset archive does not fail', () => {
    expect(createPresetFile({ name: 'Test', programs: [] })).resolves.toBeTruthy();
  });

  test('creating a program archive does not fail', () => {
    expect(createProgramFile(INIT_PROGRAM)).resolves.toBeTruthy();
  });
});
