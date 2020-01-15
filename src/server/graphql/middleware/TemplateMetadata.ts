import { Op } from 'sequelize';

import GQLMiddleware from '@server/graphql/GQLMiddleware';
import { QueryResolvers } from '@common/GQLTypes';
import TemplateMetadataModel from '@server/database/models/TemplateMetadata';
import { Context } from '@server/graphql';
import { transformTemplateMetadata } from '../Transform';
import Errors from '../../Errors';


class TemplateMetadata extends GQLMiddleware {
  // eslint-disable-next-line class-methods-use-this
  Query(): QueryResolvers<Context> {
    return {
      templateMetadata: async (parent, args, context) => {
        const user = await context.getUser();
        const whereOptions: { [key: string]: any } = { private: false };
        if (user) whereOptions.authorId = user.id;
        const rows = await TemplateMetadataModel.findAll({
          where: { [Op.or]: whereOptions },
        });
        return rows.map(transformTemplateMetadata);
      },
      templateMetadatum: async (parent, { id }, context) => {
        const user = await context.getUser();
        const whereOptions: { [key: string]: any } = { private: false };
        if (user) whereOptions.authorId = user.id;
        const metadata = await TemplateMetadataModel.findOne({
          where: {
            id,
            [Op.or]: whereOptions,
          },
        });
        if (!metadata) {
          return {
            success: false,
            code: 'QL0003',
            message: Errors.QL0003,
          };
        }
        return {
          success: true,
          templateMetadata: transformTemplateMetadata(metadata),
        };
      },
    };
  }
}

export default TemplateMetadata;
