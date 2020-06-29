import { Reducer, Action } from 'redux';
import { INCREMENT, DECREMENT } from './types';

const rootReducer: Reducer<number, Action> = (state = 0, action: Action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default rootReducer;
