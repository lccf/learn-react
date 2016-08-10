/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';
import Hello from './hello';

// const rootEl = document.getElementById('container');


export default function (rootEl: HTMLElement) {
    render(
        <Hello text="react app" />,
        rootEl
    )
}