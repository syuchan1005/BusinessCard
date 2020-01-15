/* eslint-disable no-console */
import { QueryInterface } from 'sequelize';
import { promises } from 'fs';
import { resolve } from 'path';
import { pd } from '@sterlp/pretty-data';

const { readFile } = promises;

const templatesPath = resolve('templates');

module.exports = {
  up: (
    queryInterface: QueryInterface,
  ) => queryInterface.sequelize.transaction(async (transaction) => {
    try {
      const metadata: any = JSON.parse(await readFile(resolve(templatesPath, 'metadata.json'), 'utf8'));

      const sizeIds = await Promise.all(metadata.sizes.map(async (size) => {
        let sizeId = await queryInterface.rawSelect('template_sizes', {
          where: size,
          transaction,
        }, 'id');
        if (!sizeId) {
          // @ts-ignore
          sizeId = await queryInterface.bulkInsert('template_sizes', [size], { transaction });
        }
        return sizeId;
      }));
      const authorId = await queryInterface.rawSelect('users', {
        where: { name: 'ADMIN' },
        transaction,
      }, 'id');
      await Promise.all(metadata.metadata.map(async (meta) => {
        let metaId = await queryInterface.rawSelect('template_metadata', {
          where: { authorId, name: meta.name, sizeId: sizeIds[meta.size] },
          transaction,
        }, 'id');
        if (!metaId) {
          const insert = {
            ...meta,
            authorId,
            sizeId: sizeIds[meta.size],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          delete insert.size;
          delete insert.templates;
          // @ts-ignore
          metaId = await queryInterface.bulkInsert('template_metadata', [insert], { transaction });

          const insertTemplates = await Promise.all(Object.entries(meta.templates)
            .map(async ([key, value]) => ({
              metaId,
              type: key.toUpperCase(),
              svg: pd.xmlmin(
                await readFile(`${templatesPath}/${value}`, 'utf8'),
                false,
              ).replace(/\n\s+/g, ' ')
                .replace(/\n/g, ''),
              createdAt: new Date(),
              updatedAt: new Date(),
            })));

          await queryInterface.bulkInsert('templates', insertTemplates, { transaction });
        }
      }));
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
    return Promise.resolve();
  }),
  down: (
    queryInterface: QueryInterface,
  ) => queryInterface.sequelize.transaction(async (transaction) => {
    try {
      const metadata: any = JSON.parse(await readFile(resolve(templatesPath, 'metadata.json'), 'utf8'));

      const authorId = await queryInterface.rawSelect('users', {
        where: { name: 'ADMIN' },
        transaction,
      }, 'id');
      const sizeIds = await Promise.all(metadata.sizes.map((size) => queryInterface.rawSelect('template_sizes', {
        where: size,
        transaction,
      }, 'id')));
      await Promise.all(metadata.metadata.map(async (meta) => {
        await queryInterface.bulkDelete(
          'template_metadata',
          { authorId, name: meta.name, sizeId: sizeIds[meta.size] },
          { transaction },
        );
      }));
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
    return Promise.resolve();
  }),
};
