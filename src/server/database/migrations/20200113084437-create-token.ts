/* eslint-disable no-console */
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ) => queryInterface.sequelize.transaction(async (transaction) => {
    try {
      await queryInterface.createTable('tokens', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        expires: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        accessToken: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        refreshToken: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      }, { transaction });
      await queryInterface.addConstraint('tokens', ['userId'], {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: 'foreign key',
        name: 'fk_tokens_userId_id_users',
        references: {
          table: 'users',
          field: 'id',
        },
        transaction,
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
    return Promise.resolve();
  }),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('tokens'),
};
