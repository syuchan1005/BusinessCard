import { Token } from '@common/GQLTypes';
import { Reducer } from 'react';
import { isType } from 'typescript-fsa';
import { Set } from './actions';

const initialState: Omit<Token, 'expiresIn'> & { expiresIn: Date } = {
  accessToken: undefined,
  refreshToken: undefined,
  expiresIn: undefined,
};

const reducers: Reducer<
  typeof initialState,
  any
> = (state = initialState, action) => {
  if (isType(action, Set)) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

export default reducers;
