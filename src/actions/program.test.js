import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { INIT_PROGRAM, CUTOFF, VOICE_MODE } from '../minilogue/program';
import { PARAMETER_TO_CODE } from '../minilogue/midi';
import * as actions from './program';

describe('program actions', () => {
  it('should create an action to set a parameter', () => {
    const expectedAction = {
      type: actions.PARAMETER_SET,
      payload: {
        parameter: 0,
        value: 1,
      },
    };
    expect(actions.setParameter(0, 1)).toEqual(expectedAction);
  });

  it('should create an action to set a parameter and send a CC message when configured', () => {
    // 43: types.CUTOFF,
    const mockStore = configureMockStore([thunk]);
    const mockSend = jest.fn();
    const store = mockStore({
      configuration: {
        midiInput: 'input',
        midiOutput: 'output',
        midiOutputChannel: 1,
        midiSend: true,
      },
      midi: {
        access: {
          outputs: {
            get: () => ({ send: mockSend }),
          },
        },
      },
    });
    const expectedAction = {
      type: actions.PANEL_PARAMETER_SET,
      payload: {
        parameter: CUTOFF,
        value: 512,
      },
    };
    store.dispatch(actions.setPanelParameter(CUTOFF, 512));
    expect(store.getActions()).toEqual([expectedAction]);
    expect(mockSend.mock.calls.length).toEqual(1);
    expect(mockSend.mock.calls[0][0]).toEqual([0xB1, PARAMETER_TO_CODE[CUTOFF], 64]);
  });

  it('should create an action to set a parameter and not send a CC message when configured not to', () => {
    // 43: types.CUTOFF,
    const mockStore = configureMockStore([thunk]);
    const mockSend = jest.fn();
    const store = mockStore({
      configuration: {
        midiInput: 'input',
        midiOutput: 'output',
        midiOutputChannel: 1,
        midiSend: false,
      },
      midi: {
        access: {
          outputs: {
            get: () => ({ send: mockSend }),
          },
        },
      },
    });
    const expectedAction = {
      type: actions.PANEL_PARAMETER_SET,
      payload: {
        parameter: CUTOFF,
        value: 512,
      },
    };
    store.dispatch(actions.setPanelParameter(CUTOFF, 512));
    expect(store.getActions()).toEqual([expectedAction]);
    expect(mockSend.mock.calls.length).toEqual(0);
  });

  it('should create an action to set a parameter and not send a CC message when the control is not MIDI controllable', () => {
    const mockStore = configureMockStore([thunk]);
    const mockSend = jest.fn();
    const store = mockStore({
      configuration: {
        midiInput: 'input',
        midiOutput: 'output',
        midiOutputChannel: 1,
        midiSend: true,
      },
      midi: {
        access: {
          outputs: {
            get: () => ({ send: mockSend }),
          },
        },
      },
    });
    const expectedAction = {
      type: actions.PANEL_PARAMETER_SET,
      payload: {
        parameter: VOICE_MODE,
        value: 1,
      },
    };
    store.dispatch(actions.setPanelParameter(VOICE_MODE, 1));
    expect(store.getActions()).toEqual([expectedAction]);
    expect(mockSend.mock.calls.length).toEqual(0);
  });

  it('should create an action to set the current program', () => {
    const expectedAction = {
      type: actions.CURRENT_PROGRAM_SET,
      payload: {
        0: 1,
      },
    };
    expect(actions.setCurrentProgram({ 0: 1 })).toEqual(expectedAction);
  });

  it('should create an action to request the current program', () => {
    const mockStore = configureMockStore([thunk]);
    const mockSend = jest.fn();
    const store = mockStore({
      configuration: {
        midiInput: 'input',
        midiOutput: 'output',
        midiOutputChannel: 1,
      },
      midi: {
        access: {
          outputs: {
            get: () => ({ send: mockSend }),
          },
        },
      },
    });
    store.dispatch(actions.requestCurrentProgram());
    const seenActions = store.getActions();
    expect(seenActions.length).toBe(1);
    expect(mockSend.mock.calls.length).toBe(1);
  });

  it('should create an action to send the current program', () => {
    const mockStore = configureMockStore([thunk]);
    const mockSend = jest.fn();
    const store = mockStore({
      configuration: {
        midiOutput: 'output',
        midiOutputChannel: 1,
      },
      midi: {
        access: {
          outputs: {
            get: () => ({ send: mockSend }),
          },
        },
      },
      currentProgram: INIT_PROGRAM,
    });
    store.dispatch(actions.sendCurrentProgram());
    const seenActions = store.getActions();
    expect(seenActions.length).toBe(1);
    expect(mockSend.mock.calls.length).toBe(1);
  });
});
