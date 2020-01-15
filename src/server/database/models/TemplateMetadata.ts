import {
  Sequelize,
  Model,
  DataTypes,
  Association,
} from 'sequelize';
import User from './User';
import TemplateSize from './TemplateSize';
import Template from './Template';

class TemplateMetadata extends Model {
  public id!: number;

  public authorId!: number;

  public private!: boolean;

  public name!: string;

  public description!: string;

  public sizeId!: number;

  public orientation!: 'PORTRAIT' | 'LANDSCAPE';

  /*
  author belongsTo methods
  */

  public readonly author?: User;

  /*
  size belongsTo methods
  */

  public readonly size?: TemplateSize;

  /*
  templates hasMany methods
  */

  public readonly templates?: Template[];

  public static associations: {
    author: Association<TemplateMetadata, User>;
    size: Association<TemplateMetadata, TemplateSize>;
    templates: Association<TemplateMetadata, Template>;
  };

  public static initialize(sequelize: Sequelize) {
    TemplateMetadata.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'authorId_name_sizeId',
      },
      private: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: 'authorId_name_sizeId',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sizeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'authorId_name_sizeId',
      },
      orientation: {
        type: DataTypes.ENUM('PORTRAIT', 'LANDSCAPE'),
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'template_metadata',
    });

    return TemplateMetadata;
  }

  public static associate() {
    TemplateMetadata.belongsTo(User, {
      foreignKey: 'authorId',
      as: 'author',
    });
    TemplateMetadata.belongsTo(TemplateSize, {
      foreignKey: 'sizeId',
      as: 'size',
    });
    TemplateMetadata.hasMany(Template, {
      foreignKey: 'metaId',
      /*
      as: {
        singular: 'template',
        plural: 'templates',
      },
      */
      as: 'templates',
    });
  }
}

export default TemplateMetadata;
