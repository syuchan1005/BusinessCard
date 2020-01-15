import {
  Sequelize,
  Model,
  DataTypes,
  Association,
} from 'sequelize';
import TemplateMetadata from './TemplateMetadata';

class User extends Model {
  public id!: number;

  public name!: string;

  public hash!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly templateMetadata?: TemplateMetadata[];

  public static associations: {
    templateMetadata: Association<User, TemplateMetadata>,
  };

  public static initialize(sequelize: Sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      hash: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'users',
    });

    return User;
  }

  public static associate() {
    User.hasMany(TemplateMetadata, {
      foreignKey: 'authorId',
      as: {
        singular: 'templateMetadatum',
        plural: 'templateMetadata',
      },
    });
  }
}

export default User;
