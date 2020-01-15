import React, { FC, useCallback, useState } from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import {
  createStyles,
  FormGroup,
  makeStyles,
  TextField,
  Paper,
  Theme,
  Icon,
  Button,
} from '@material-ui/core';

import {
  // @ts-ignore
  TemplateMetadatumQueryData,
  // @ts-ignore
  TemplateMetadatumQueryVariables,
} from '@common/GQLTypes';
import TemplateMetadatumQuery from '@client/graphqls/pages_template_templateMetadatum.gql';

import FullscreenLoading from '@client/component/FullscreenLoading';
import useOrderedTemplates from '@client/hooks/useOrderedTemplates';
import { Transition } from 'react-transition-group';

type EditData = {
  text: string;
  attributes: {
    [key: string]: {
      default: string;
      value: string;
    },
  },
}

const FLIP_STYLE = {
  entering: {
    transition: 'all .5s ease',
    transform: 'rotateY(-180deg)',
  },
  entered: {
    transition: '',
    transform: 'rotateY(-180deg)',
  },
  exiting: {
    transition: 'all .5s ease',
    transform: 'rotateY(-360deg)',
  },
  exited: {
    transition: '',
    transform: 'rotateY(0)',
  },
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  template: {
    width: '100%',
    height: '100%',
    paddingTop: theme.spacing(1),
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
    '&.back': {
      transform: 'rotateY(180deg)',
    },
  },
  svgFlipWrapper: {
    width: `calc(100% - ${theme.spacing(2)}px)`,
    margin: theme.spacing(0, 1),
    height: 'fit-content',
    maxHeight: '50vh',
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  form: {
    '& > *': {
      marginBottom: theme.spacing(1),
    },
  },
}));

const Template: FC = (props) => {
  const params = useParams<{ metaId: string }>();
  const classes = useStyles(props);

  const {
    data,
    loading,
  } = useQuery<TemplateMetadatumQueryData,
    TemplateMetadatumQueryVariables>(TemplateMetadatumQuery, {
      variables: {
        id: params.metaId,
      },
    });

  const templates = useOrderedTemplates(data?.templateMetadatum.templateMetadata?.templates);

  const [editContent, setEditContent] = useState<{ [key: string]: EditData }>({});
  const [front, setFront] = useState(true);

  const onSvgReady = useCallback((svg: SVGElement) => {
    setEditContent(
      Array.from(svg.querySelectorAll('[data-editable]'))
        .reduce((obj, elem: SVGElement) => ({
          ...obj,
          [elem.dataset.editable]: {
            text: elem.textContent,
            attributes: Object.keys(elem.attributes)
              .map((k): [string, string] => [elem.attributes[k].name, elem.attributes[k].value])
              .filter(([k]) => !['xmlns', 'data-'].some((a) => k.startsWith(a)))
              .reduce((o, [k, v]) => ({
                ...o,
                [k]: { default: v, value: v },
              }), {}),
          },
        }), { ...editContent }),
    );
  }, [editContent]);

  return (
    <div className={classes.template}>
      {loading && <FullscreenLoading />}
      {(data && templates.some((t) => t)) && (
        <Transition timeout={550} in={!front}>
          {(state) => (
            <Paper
              style={FLIP_STYLE[state]}
              className={classes.svgFlipWrapper}
            >
              <SvgLoader
                svgXML={(templates[0] || templates[1]).svg}
                className={classes.svg}
                style={{ opacity: 0 }}
              />
              {templates.map((template) => (
                <div key={template.id} className={`${classes.svgView} ${template.type.toLowerCase()}`}>
                  <SvgLoader
                    svgXML={template.svg}
                    className={classes.svg}
                    onSVGReady={onSvgReady}
                  >
                    {Object.keys(editContent).map((k) => (
                      <SvgProxy key={k} selector={`[data-editable="${k}"]`} {...editContent[k].attributes}>
                        {editContent[k].text}
                      </SvgProxy>
                    ))}
                  </SvgLoader>
                </div>
              ))}
            </Paper>
          )}
        </Transition>
      )}

      <Paper className={classes.paper} elevation={0}>
        <FormGroup className={classes.form}>
          <Button onClick={() => setFront(!front)}>
            <Icon>flip</Icon>
            Flip
          </Button>
          {Object.keys(editContent).map((k) => (
            <TextField
              key={k}
              label={k}
              value={editContent[k].text}
              onChange={(e) => setEditContent({
                ...editContent,
                [k]: {
                  ...(editContent[k]),
                  text: e.target.value,
                },
              })}
            />
          ))}
        </FormGroup>
      </Paper>
    </div>
  );
};

export default Template;
