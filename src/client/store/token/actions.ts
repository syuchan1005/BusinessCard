import { actionCreatorFactory } from 'typescript-fsa';
import { Token } from '@common/GQLTypes';

const actionCreator = actionCreatorFactory('TOKEN');

// eslint-disable-next-line import/prefer-default-export
export const Set = actionCreator<Omit<Token, 'expiresIn'> & { expiresIn: Date }>('SET');
