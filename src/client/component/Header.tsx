import React, { FC, useCallback, useState } from 'react';
import {
  AppBar,
  createStyles,
  Icon,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetToken, Set } from '@client/store/token';
import { commonTheme } from '@client/App';

const useStyles = makeStyles((theme) => createStyles({
  appBar: {
    '& + .appbar--margin': commonTheme.appbar(theme, 'paddingTop'),
    paddingTop: commonTheme.safeArea.top,
  },
}));

const Header: FC = (props) => {
  const classes = useStyles(props);

  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(GetToken);

  const [menuAnchor, setMenuAnchor] = useState(null);

  const clickLogout = useCallback(() => {
    setMenuAnchor(null);
    dispatch(Set({
      accessToken: undefined,
      refreshToken: undefined,
      expiresIn: undefined,
    }));
    history.push('/');
  }, []);

  const clickBack = useCallback(() => {
    if (history.location.pathname === '/template_list') {
      clickLogout();
    } else {
      history.goBack();
    }
  }, [clickLogout, history]);

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        {(history.location.pathname !== '/') && (
          <IconButton
            edge="start"
            aria-label="back"
            color="inherit"
            onClick={clickBack}
          >
            <Icon>arrow_back</Icon>
          </IconButton>
        )}
        <Typography variant="h6" component="h1" style={{ flexGrow: 1 }}>
          Business Card
        </Typography>
        {(token.accessToken) && (
          <IconButton
            edge="end"
            aria-label="back"
            color="inherit"
            onClick={(e) => setMenuAnchor(e.currentTarget)}
          >
            <Icon>account_circle</Icon>
          </IconButton>
        )}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          keepMounted
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem onClick={clickLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
