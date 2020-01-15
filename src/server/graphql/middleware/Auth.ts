import { Op } from 'sequelize';

import GQLMiddleware from '@server/graphql/GQLMiddleware';
import { hash, verify, generateRandomToken } from '@server/Util';
import User from '@server/database/models/User';
import Token from '@server/database/models/Token';
import { sequelize } from '@server/database/models';
import Errors from '@server/Errors';

import { MutationResolvers } from '@common/GQLTypes';

const expiresIn /* unit: sec */ = /* 10day */ 60 * 60 * 24 * 10;

class Auth extends GQLMiddleware {
  // eslint-disable-next-line class-methods-use-this
  Mutation(): MutationResolvers {
    return {
      signUp: async (parent, { name, password }) => {
        let user: User;
        let token: Token;
        try {
          await sequelize.transaction(async (transaction) => {
            user = await User.create({
              name,
              hash: await hash(password),
            }, { transaction });
            token = await Token.create({
              userId: user.id,
              expires: Date.now() + expiresIn,
              accessToken: await generateRandomToken(),
              refreshToken: await generateRandomToken(),
            }, { transaction });
          });
        } catch (e) {
          return {
            success: false,
            code: 'QL0000',
            message: Errors.QL0000,
          };
        }
        return {
          token: {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            expiresIn,
          },
          success: true,
        };
      },
      logIn: async (parent, { name, password }) => {
        const user = await User.findOne({ where: { name } });
        if (!user || !user.hash || !(await verify(user.hash, password))) {
          return {
            success: false,
            code: 'QL0001',
            message: Errors.QL0001,
          };
        }
        let token: Token;
        try {
          await sequelize.transaction(async (transaction) => {
            token = await Token.create({
              userId: user.id,
              expires: Date.now() + expiresIn,
              accessToken: await generateRandomToken(),
              refreshToken: await generateRandomToken(),
            }, { transaction });
          });
        } catch (e) {
          return {
            success: false,
            code: 'QL0000',
            message: Errors.QL0000,
          };
        }
        return {
          token: {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            expiresIn,
          },
          success: true,
        };
      },
      revokeToken: async (parent, { token }) => {
        let count: number = 0;
        await sequelize.transaction(async (transaction) => {
          count = await Token.destroy({
            where: {
              accessToken: token,
            },
            transaction,
          });
        });
        return count > 0;
      },
      refreshToken: async (parent, { refreshToken }) => {
        let token = await Token.findOne({
          where: {
            refreshToken,
            expires: { [Op.gte]: Date.now() },
          },
        });
        if (!token) {
          return {
            success: false,
            code: 'QL0002',
            message: Errors.QL0002,
          };
        }
        try {
          await sequelize.transaction(async (transaction) => {
            await token.destroy({ transaction });
            token = await Token.create({
              userId: token.userId,
              expires: Date.now() + expiresIn,
              accessToken: await generateRandomToken(),
              refreshToken: await generateRandomToken(),
            }, { transaction });
          });
        } catch (e) {
          return {
            success: false,
            code: 'QL0000',
            message: Errors.QL0000,
          };
        }
        return {
          token: {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            expiresIn,
          },
          success: true,
        };
      },
    };
  }
}

export default Auth;
