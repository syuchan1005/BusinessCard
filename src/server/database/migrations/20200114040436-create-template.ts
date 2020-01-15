/* eslint-disable no-console */
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ) => queryInterface.sequelize.transaction(async (transaction) => {
    try {
      await queryInterface.createTable('templates', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        metaId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'metaId_type',
        },
        type: {
          type: Sequelize.ENUM('FRONT', 'BACK'),
          allowNull: false,
          unique: 'metaId_type',
        },
        svg: {
          type: Sequelize.TEXT,
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
      await queryInterface.addConstraint('templates', ['metaId'], {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        type: 'foreign key',
        name: 'fk_templates_metaId_id_template_metadata',
        references: {
          table: 'template_metadata',
          field: 'id',
        },
        transaction,
      });
      await queryInterface.addConstraint('templates', ['metaId', 'type'], {
        type: 'unique',
        name: 'uq_templates_metaId_type',
        transaction,
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
    return Promise.resolve();
  }),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('templates'),
};
