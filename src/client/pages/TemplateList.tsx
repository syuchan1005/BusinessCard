import React, { FC } from 'react';
import {
  createStyles,
  Icon,
  makeStyles,
  Theme,
  Typography,
  Fab,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { TemplateMetadataQueryData, TemplateMetadataQueryVariables } from '@common/GQLTypes';

import TemplateMetadataQuery from '@client/graphqls/pages_templateList_templateMetadata.gql';
import FullscreenLoading from '@client/component/FullscreenLoading';
import TemplateMetadataCard from '@client/component/TemplateMetadataCard';

const useStyles = makeStyles((theme: Theme) => createStyles({
  templateList: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(1),
  },
  templateCardList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 220px) [end]',
    gridGap: theme.spacing(1),
    padding: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const TemplateList: FC = (props) => {
  const classes = useStyles(props);
  const history = useHistory();

  const {
    data,
    loading,
    refetch,
  } = useQuery<
    TemplateMetadataQueryData,
    TemplateMetadataQueryVariables
  >(TemplateMetadataQuery, {});

  return (
    <div className={classes.templateList}>
      {loading && (<FullscreenLoading />)}

      <Typography
        variant="h5"
        component="h2"
        className={classes.title}
      >
        Templates
      </Typography>

      <div className={classes.templateCardList}>
        {data && data.templateMetadata.map((t) => (
          <TemplateMetadataCard
            key={t.id}
            {...t}
            onClick={(id) => history.push(`/template/${id}`)}
          />
        ))}
      </div>

      <Fab color="secondary" className={classes.fab} onClick={() => refetch()}>
        <Icon>refresh</Icon>
      </Fab>
    </div>
  );
};

export default TemplateList;
