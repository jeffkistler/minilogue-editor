/**
 * Minilogue device discovery state updates.
 */
import {
  MINILOGUE_SEARCH_REQUEST_INITIATED,
  MINILOGUE_SEARCH_REQUEST_CANCELED,
  MINILOGUE_SEARCH_REPLY_RECEIVED,
} from '../actions/discovery';

const initialState = {
  pendingSearchRequests: {},
};

export default function discoveryReducer(discoveryState = initialState, action) {
  switch (action.type) {
    case MINILOGUE_SEARCH_REQUEST_INITIATED: {
      const { key: toAdd, port } = action.payload;
      const newPendingSearchRequests = { ...discoveryState.pendingSearchRequests, [toAdd]: port };
      return { ...discoveryState, pendingSearchRequests: newPendingSearchRequests };
    }
    case MINILOGUE_SEARCH_REQUEST_CANCELED:
    case MINILOGUE_SEARCH_REPLY_RECEIVED: {
      const { key: toRemove } = action.payload;
      const toRemoveFrom = { ...discoveryState.pendingSearchRequests };
      delete toRemoveFrom[toRemove];
      return { ...discoveryState, pendingSearchRequests: toRemoveFrom };
    }
    default:
      return discoveryState;
  }
}
