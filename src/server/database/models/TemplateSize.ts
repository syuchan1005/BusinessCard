import {
  Sequelize,
  Model,
  DataTypes, Association,
} from 'sequelize';
import TemplateMetadata from './TemplateMetadata';

class TemplateSize extends Model {
  public id!: number;

  public name!: string;

  public width!: number;

  public height!: number;

  /*
  templateMetadata hasMany methods
  */

  public readonly templateMetadata?: TemplateMetadata[];

  public static associations: {
    size: Association<TemplateSize, TemplateMetadata>;
  };

  public static initialize(sequelize: Sequelize) {
    TemplateSize.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: 'name_width_height',
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'name_width_height',
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'name_width_height',
      },
    }, {
      sequelize,
      tableName: 'template_sizes',
      timestamps: false,
    });

    return TemplateSize;
  }

  public static associate() {
    TemplateSize.hasMany(TemplateMetadata, {
      foreignKey: 'sizeId',
      as: {
        singular: 'templateMetadatum',
        plural: 'templateMetadata',
      },
    });
  }
}

export default TemplateSize;
