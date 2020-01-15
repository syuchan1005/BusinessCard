import React, { FC, useCallback, useState } from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  makeStyles,
  Paper, TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import SignUpMutation from '@client/graphqls/pages_top_signup.gql';
import LogInMutation from '@client/graphqls/pages_top_login.gql';
import {
  LogInMutationData,
  LogInMutationVariables,
  SignUpMutationData,
  SignUpMutationVariables,
} from '@common/GQLTypes';
import { Set } from '@client/store/token';
import FullscreenLoading from '@client/component/FullscreenLoading';

const useStyles = makeStyles((theme) => createStyles({
  top: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(3),
    '& > *': {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
  },
}));

const Top: FC = (props) => {
  const classes = useStyles(props);
  const history = useHistory();

  const [openDialog, setOpenDialog] = useState(false);
  const [type, setType] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const [signUp, {
    loading: signUpLoading,
  }] = useMutation<SignUpMutationData, SignUpMutationVariables>(SignUpMutation, {
    variables: {
      name,
      password,
    },
    onCompleted({ signUp: up }) {
      if (up.success) {
        dispatch(Set({
          ...up.token,
          expiresIn: new Date(
            Date.now() + (up.token.expiresIn * 1000) - (/* 5min */ 1000 * 60 * 5),
          ),
        }));
        history.push('/template_list');
      }
    },
  });

  const [logIn, {
    loading: logInLoading,
  }] = useMutation<LogInMutationData, LogInMutationVariables>(LogInMutation, {
    variables: {
      name,
      password,
    },
    onCompleted({ logIn: up }) {
      if (up.success) {
        dispatch(Set({
          ...up.token,
          expiresIn: new Date(
            Date.now() + (up.token.expiresIn * 1000) - (/* 5min */ 1000 * 60 * 5),
          ),
        }));
        history.push('/template_list');
      }
    },
  });

  const clickOpenDialog = useCallback((t: typeof type) => {
    setType(t);
    setOpenDialog(true);
  }, []);

  const clickDialogAction = useCallback(async () => {
    if (type === 'signup') {
      await signUp();
    } else {
      await logIn();
    }
  }, [signUp, logIn]);

  return (
    <div className={classes.top}>
      {(signUpLoading || logInLoading) && (<FullscreenLoading />)}
      <Paper className={classes.paper}>
        <Button variant="contained" onClick={() => clickOpenDialog('login')}>Login</Button>
        <div>or</div>
        <Button variant="contained" onClick={() => clickOpenDialog('signup')}>Sign up</Button>
      </Paper>

      <Dialog open={openDialog}>
        <DialogTitle>{type}</DialogTitle>
        <DialogContent>
          <FormGroup>
            <TextField
              label="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              type="password"
              label="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {type === 'signup' && (<TextField type="password" label="(re) password" />)}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            close
          </Button>
          <Button color="secondary" onClick={clickDialogAction}>
            {type}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Top;
