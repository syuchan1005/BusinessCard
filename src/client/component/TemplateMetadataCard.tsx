import React, { FC, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  createStyles,
  makeStyles,
  Typography,
  Icon,
  IconButton,
} from '@material-ui/core';
import { SvgLoader } from 'react-svgmt';
import { Transition } from 'react-transition-group';

import {
  Template,
  TemplateMetadata,
  TemplateSize,
  User,
} from '@common/GQLTypes';
import useOrderedTemplates from '@client/hooks/useOrderedTemplates';

type T = Pick<TemplateMetadata,
  'id' | 'name' | 'description' | 'private' | 'orientation'> & { size: Pick<TemplateSize, 'name' | 'width' | 'height'> }
  & { author: Pick<User, 'name'> }
  & { templates: Array<Pick<Template, 'id' | 'type' | 'svg'>> };

interface TemplateMetadataCardProps extends T {
  onClick?: (metaId) => any;
}

const FLIP_STYLE = {
  // 前面⇒背面
  entering: {
    transition: 'all .5s ease',
    transform: 'rotateY(-180deg)',
  },
  // 背面
  entered: {
    transition: '',
    transform: 'rotateY(-180deg)',
  },
  // 背面⇒前面
  exiting: {
    transition: 'all .5s ease',
    transform: 'rotateY(-360deg)',
  },
  // 前面
  exited: {
    transition: '',
    transform: 'rotateY(0)',
  },
};

const useStyles = makeStyles(() => createStyles({
  card: {
    height: 'fit-content',
    position: 'relative',
  },
  svg: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    userSelect: 'none',
  },
  svgView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backfaceVisibility: 'hidden',
    '&:nth-child(2)': {
      transform: 'rotateY(180deg)',
    },
  },
  svgFlipWrapper: {
    width: '100%',
    height: '100px',
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
}));

const TemplateMetadataCard: FC<TemplateMetadataCardProps> = (props: TemplateMetadataCardProps) => {
  const {
    id,
    name,
    description,
    private: prv,
    size,
    orientation,
    author: { name: authorName },
    templates,
    onClick,
  } = props;

  const classes = useStyles(props);

  const orderedTemplates = useOrderedTemplates(templates);

  const [front, setFront] = useState(true);

  return (
    <Card className={classes.card}>
      <IconButton
        onClick={() => setFront(!front)}
        size="small"
        style={{ position: 'absolute', zIndex: 1, right: 0 }}
      >
        <Icon>flip</Icon>
      </IconButton>
      <Transition timeout={550} in={!front}>
        {(state) => (
          // eslint-disable-next-line
          <div
            style={FLIP_STYLE[state]}
            className={classes.svgFlipWrapper}
            onClick={() => setFront(!front)}
          >
            <div className={classes.svgView}>
              <SvgLoader svgXML={orderedTemplates[0]?.svg} className={classes.svg} />
            </div>

            <div className={classes.svgView}>
              <SvgLoader svgXML={orderedTemplates[1]?.svg} className={classes.svg} />
            </div>
          </div>
        )}
      </Transition>

      <CardActionArea onClick={() => onClick(id)}>
        <CardContent>
          <Typography variant="h6" component="h3">{name}</Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">{description}</Typography>
          <Typography variant="body2" color="textSecondary" component="pre">
            {[
              prv ? 'Private' : 'Public',
              `Author: ${authorName}`,
              `Orientation: ${orientation}`,
              `Size: ${size.name}(${size.width}x${size.height})`,
            ].join('\n')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TemplateMetadataCard;
