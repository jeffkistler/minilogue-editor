import * as sysex from './sysex';

test('that a simple encoded message is correctly decoded', () => {
  const testData = new Uint8Array(
    [127, 127, 127, 127, 127, 127, 127, 127],
  );
  expect(sysex.decodeSysexData(testData)).toEqual(
    new Uint8Array([255, 255, 255, 255, 255, 255, 255]),
  );
});

test('that a simple message is encoded correctly', () => {
  const testData = new Uint8Array(
    [255, 255, 255, 255, 255, 255, 255],
  );
  expect(sysex.encodeSysexData(testData)).toEqual(
    new Uint8Array(
      [127, 127, 127, 127, 127, 127, 127, 127],
    ),
  );
});

test('that a round trip through encode-decode results in the same message', () => {
  const testData = new Uint8Array(Array.from({ length: 7 }, () => Math.floor(Math.random() * 256)));
  const encoded = sysex.encodeSysexData(testData);
  expect(encoded.length).toBe(8);
  expect(sysex.decodeSysexData(encoded)).toEqual(testData);
});
