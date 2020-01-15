import React, { FC } from 'react';
import {
  CircularProgress,
  createStyles, makeStyles, Theme,
} from '@material-ui/core';

const toRgba = (hex: string, alpha: number) => {
  const h = (hex.length === 4)
    ? hex.substring(1).split('').map((s) => s.repeat(2))
    : hex.substring(1).match(/.{2}/);
  const c = [...h.map((s) => parseInt(s, 16)), alpha];
  return `rgba(${c.join(', ')})`;
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: toRgba(theme.palette.secondary.contrastText, 0.4),
    zIndex: 99999,
  },
}));

const FullscreenLoading: FC = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.loading}>
      <CircularProgress color="secondary" size="20vw" />
    </div>
  );
};

export default FullscreenLoading;
