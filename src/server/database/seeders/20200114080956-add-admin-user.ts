/* eslint-disable no-console */
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
  ) => queryInterface.sequelize.transaction(async (transaction) => {
    try {
      const userId = await queryInterface.rawSelect('users', {
        where: { name: 'ADMIN' },
        transaction,
      }, 'id');
      if (!userId) {
        await queryInterface.bulkInsert('users', [{
          name: 'ADMIN',
          hash: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        }], { transaction });
      }
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
    return Promise.resolve();
  }),
  down: (
    queryInterface: QueryInterface,
  ) => queryInterface.bulkDelete('users', { name: 'ADMIN' }),
};
