import { Sequelize } from 'sequelize';
import baseConfig from '../config';
import Token from './Token';
import User from './User';
import TemplateSize from './TemplateSize';
import TemplateMetadata from './TemplateMetadata';
import Template from './Template';

const env = process.env.NODE_ENV || 'development';
const config = baseConfig[env];

let s: Sequelize;
if (config.dialect === 'sqlite') {
  s = new Sequelize(config);
} else if (config.use_env_variable) {
  s = new Sequelize(process.env[config.use_env_variable], config);
} else {
  s = new Sequelize(config.database, config.username, config.password, config);
}

export const sequelize = s;

export const models = {
  User: User.initialize(sequelize),
  Token: Token.initialize(sequelize),
  TemplateSize: TemplateSize.initialize(sequelize),
  TemplateMetadata: TemplateMetadata.initialize(sequelize),
  Template: Template.initialize(sequelize),
};

// @ts-ignore
Object.values(models).forEach(({ associate }) => {
  if (associate) associate();
});

export default async () => {
  await Promise.all(Object.values(models).map((m) => m.sync()));
  return sequelize;
};
