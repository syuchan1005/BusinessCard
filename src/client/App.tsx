import React, { FC } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Theme,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import { hot } from 'react-hot-loader/root';

import Top from '@client/pages/Top';
import Template from '@client/pages/Template';
import TemplateList from '@client/pages/TemplateList';
import Header from '@client/component/Header';

export const commonTheme = {
  safeArea: {
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)',
    right: 'env(safe-area-inset-right)',
    left: 'env(safe-area-inset-left)',
  },
  appbar: (
    theme: Theme,
    styleName: string,
    calcOption?: string,
  ) => Object.keys(theme.mixins.toolbar)
    .map((key) => {
      const val = theme.mixins.toolbar[key];
      if (key === 'minHeight') {
        return [
          [styleName, `calc(${commonTheme.safeArea.top} + ${val}px${calcOption || ''})`],
          ['fallbacks', {
            [styleName]: (calcOption) ? `calc(${val}px${calcOption})` : val,
          }],
        ];
      }
      return [
        [key, {
          // @ts-ignore
          [styleName]: `calc(${commonTheme.safeArea.top} + ${val.minHeight}px${calcOption || ''})`,
          fallbacks: {
            // @ts-ignore
            [styleName]: (calcOption) ? `calc(${val.minHeight}px${calcOption})` : val.minHeight,
          },
        }],
      ];
    })
    .reduce((o, props) => {
      props.forEach(([k, v]) => {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        o[k] = v;
      });
      return o;
    }, {}),
};

const App: FC = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: colors.blue['500'],
        light: colors.blue['500'],
        dark: colors.blue['600'],
        contrastText: colors.common.white,
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <main className="appbar--margin">
          <Switch>
            <Route exact path="/" component={Top} />
            <Route exact path="/template/:metaId" component={Template} />
            <Route exact path="/template_list" component={TemplateList} />
          </Switch>
        </main>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default hot(App);
