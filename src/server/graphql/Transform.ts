import TemplateMetadata from '@server/database/models/TemplateMetadata';
import { TemplateMetadata as TemplateMetadataType } from '@common/GQLTypes';

// eslint-disable-next-line import/prefer-default-export
export const transformTemplateMetadata = (
  metadata: TemplateMetadata,
): TemplateMetadataType => ({
  // @ts-ignore
  ...metadata.dataValues,
  // @ts-ignore
  author: metadata.author || (() => metadata.getAuthor()),
  // @ts-ignore
  size: metadata.size || (() => metadata.getSize()),
  // @ts-ignore
  templates: metadata.templates || (() => metadata.getTemplates()),
});
