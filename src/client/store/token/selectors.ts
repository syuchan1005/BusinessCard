import { createSelector } from 'reselect';
import { State } from '../index';

// eslint-disable-next-line import/prefer-default-export
export const GetToken = createSelector(
  (state: State) => state.token,
  (token) => token,
);
