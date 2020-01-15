/* eslint-disable max-classes-per-file, react/prefer-stateless-function */
import { Component } from 'react';

declare module 'react-svgmt' {
  export interface SvgLoaderProps {
    svgXML?: string;
    path?: string;
    onSVGReady?: (node) => any,

    // svg attrs
    [key: string]: any;
  }

  export class SvgLoader extends Component<SvgLoaderProps, any> {}

  export interface SvgProxyProps {
    selector?: string;
    onElementSelected?: string;

    // svg attrs
    [key: string]: any;
  }

  export class SvgProxy extends Component<SvgProxyProps, any> {}
}
