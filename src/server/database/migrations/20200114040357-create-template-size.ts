/* eslint-disable no-console */
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ) => queryInterface.sequelize.transaction(async (transaction) => {
    try {
      await queryInterface.createTable('template_sizes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        width: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        height: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      }, {
        transaction,
      });
      await queryInterface.addConstraint('template_sizes', ['name', 'width', 'height'], {
        type: 'unique',
        name: 'uq_template_sizes_name_width_height',
        transaction,
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
    return Promise.resolve();
  }),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('template_sizes'),
};
