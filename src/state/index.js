import markers from '../data/mannbassadors.json';

export const initialState = {
  focusedMarker: undefined,
  markers,
  start: true,
}

export function reducer(state, action) {
  const { type } = action;

  switch(type) {
    case 'START':
      return {
        ...state,
        start: true,
      };

    case 'FOCUS':
      return {
        ...state,
        focusedMarker: action.payload,
      }

    case 'DEFOCUS':
      return {
        ...state,
        focusedMarker: undefined,
      }

    default:
      return state;
  }
}