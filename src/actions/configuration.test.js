import * as actions from './configuration';

describe('configuration actions', () => {
  it('should create an action to select an input', () => {
    const expectedAction = {
      type: actions.MIDI_INPUT_SELECTED,
      payload: {
        id: 'inputID',
        type: 'input',
      },
    };
    const input = {
      id: 'inputID',
      type: 'input',
    };
    expect(actions.selectMIDIInput(input)).toEqual(expectedAction);
  });

  it('should create an action to select an input channel', () => {
    const expectedAction = {
      type: actions.MIDI_INPUT_CHANNEL_SELECTED,
      payload: 15,
    };
    const channel = 15;
    expect(actions.selectMIDIInputChannel(channel)).toEqual(expectedAction);
  });

  it('should create an action to select an output', () => {
    const expectedAction = {
      type: actions.MIDI_OUTPUT_SELECTED,
      payload: {
        id: 'outputID',
        type: 'output',
      },
    };
    const output = {
      id: 'outputID',
      type: 'output',
    };
    expect(actions.selectMIDIOutput(output)).toEqual(expectedAction);
  });

  it('should create an action to select an output channel', () => {
    const expectedAction = {
      type: actions.MIDI_OUTPUT_CHANNEL_SELECTED,
      payload: 15,
    };
    const channel = 15;
    expect(actions.selectMIDIOutputChannel(channel)).toEqual(expectedAction);
  });


  it('should create an action to set MIDI CC receive', () => {
    const expectedAction = {
      type: actions.MIDI_RECEIVE_SET,
      payload: true,
    };
    const receive = true;
    expect(actions.setMIDIReceive(receive)).toEqual(expectedAction);
  });

  it('should create an action to set MIDI CC send', () => {
    const expectedAction = {
      type: actions.MIDI_SEND_SET,
      payload: false,
    };
    const send = false;
    expect(actions.setMIDISend(send)).toEqual(expectedAction);
  });
});
