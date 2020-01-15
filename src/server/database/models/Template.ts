import {
  Sequelize,
  Model,
  DataTypes, Association,
} from 'sequelize';
import TemplateMetadata from './TemplateMetadata';

class Template extends Model {
  public id!: number;

  public metaId!: number;

  public type!: 'FRONT' | 'BACK';

  public svg!: string;

  /*
  templateMetadata belongsTo methods
  */

  public readonly templateMetadata?: TemplateMetadata;

  public static associations: {
    templates: Association<Template, TemplateMetadata>;
  };

  public static initialize(sequelize: Sequelize) {
    Template.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      metaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'metaId_type',
      },
      type: {
        type: DataTypes.ENUM('FRONT', 'BACK'),
        allowNull: false,
        unique: 'metaId_type',
      },
      svg: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'templates',
    });

    return Template;
  }

  public static associate() {
    Template.belongsTo(TemplateMetadata, {
      foreignKey: 'metaId',
      as: 'templateMetadata',
    });
  }
}

export default Template;
