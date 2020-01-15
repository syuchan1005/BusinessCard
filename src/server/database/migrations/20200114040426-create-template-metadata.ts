/* eslint-disable no-console */
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ) => queryInterface.sequelize.transaction(async (transaction) => {
    try {
      await queryInterface.createTable('template_metadata', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        authorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'authorId_name_sizeId',
        },
        private: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique: 'authorId_name_sizeId',
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        sizeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'authorId_name_sizeId',
        },
        orientation: {
          type: Sequelize.ENUM('PORTRAIT', 'LANDSCAPE'),
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }, { transaction });
      await queryInterface.addConstraint('template_metadata', ['authorId'], {
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
        type: 'foreign key',
        name: 'fk_template_metadata_authorId_id_users',
        references: {
          table: 'users',
          field: 'id',
        },
        transaction,
      });
      await queryInterface.addConstraint('template_metadata', ['sizeId'], {
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
        type: 'foreign key',
        name: 'fk_template_metadata_sizeId_id_template_sizes',
        references: {
          table: 'template_sizes',
          field: 'id',
        },
        transaction,
      });
      await queryInterface.addConstraint('template_metadata', ['authorId', 'name', 'sizeId'], {
        type: 'unique',
        name: 'uq_template_metadata_authorId_name_size',
        transaction,
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
    return Promise.resolve();
  }),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('template_metadata'),
};
