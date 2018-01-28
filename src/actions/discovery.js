/**
 * Minilogue device discovery actions.
 */
export const MINILOGUE_DISCOVERY_REQUESTED = 'MINILOGUE_DISCOVERY_REQUESTED';
export const MINILOGUE_SEARCH_REQUEST_INITIATED = 'MINILOGUE_SEARCH_REQUEST_INITIATED';
export const MINILOGUE_SEARCH_REQUEST_CANCELED = 'MINILOGUE_SEARCH_REQUEST_CANCELED';
export const MINILOGUE_SEARCH_REPLY_RECEIVED = 'MINILOGUE_SEARCH_REPLY_RECEIVED';

const DISCOVERY_TIMEOUT_MS = 1000;

const has = Object.prototype.hasOwnProperty;
const generateKey = (obj) => {
  let candidate;
  for (let i = 0; i < 128; i += 1) {
    candidate = Math.floor(Math.random() * 128);
    if (!has.call(obj, candidate)) {
      return candidate;
    }
  }
  return candidate;
};

const makeSearchDeviceRequestMessage = echoBackId => (
  [0xf0, 0x42, 0x50, 0x00, echoBackId, 0xf7]
);

/**
 * Create an action to cancel a Minilogue device search.
 * @param {String} port - The MIDI output port ID.
 * @param {number} key - The search request ID.
 */
export const cancelMinilogueSearchRequest = (port, key) => (
  {
    type: MINILOGUE_SEARCH_REQUEST_CANCELED,
    payload: { port, key },
  }
);

/**
 * Create an action to initiate a Minilogue device search.
 * @param {String} port - The MIDI output port ID.
 * @param {number} key - The search request ID.
 */
export const initiateMinilogueSearchRequestForOutput = (port, key) => ({
  type: MINILOGUE_SEARCH_REQUEST_INITIATED,
  payload: { port, key },
});

/**
 * Create an action and send a MIDI message to initiate a Minilogue device search.
 * @param {String} port - The MIDI output port ID.
 */
export const initiateMinilogueSearchRequest = port => (
  (dispatch, getState) => {
    const { discovery: discoveryState, midi } = getState();
    const { pendingSearchRequests: pendingSearchRequestsState } = discoveryState;
    const key = generateKey(pendingSearchRequestsState);
    dispatch(initiateMinilogueSearchRequestForOutput(port, key));
    // Send the MIDI message
    const output = midi.access.outputs.get(port);
    output.send(makeSearchDeviceRequestMessage(key));
    // Set the timeout for the search request.
    setTimeout(
      () => {
        dispatch(cancelMinilogueSearchRequest(port, key));
      },
      DISCOVERY_TIMEOUT_MS,
    );
  }
);

/**
 * Create actions to initiate Minilogue device searches in on all attached MIDI outputs.
 */
export const discoverMinilogueDevices = () => (
  (dispatch, getState) => {
    const { midi } = getState();
    const { ports } = midi;
    Object.values(ports)
      .filter(port => port.type === 'output')
      .forEach(({ id }) => dispatch(initiateMinilogueSearchRequest(id)));
  }
);

/**
 * Create a notification action that a Minilogue search reply has been received.
 * @param {String} input - The MIDI input port ID the reply was received on.
 * @param {String} output - The MIDI output port ID the search request was sent to.
 * @param {number} channel - The MIDI channel the search request was sent/received on.
 */
export const receiveMinilogueSearchReply = (input, output, channel) => (
  {
    type: MINILOGUE_SEARCH_REPLY_RECEIVED,
    payload: { input, output, channel },
  }
);
