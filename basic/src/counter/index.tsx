import * as React from 'react';
import { render } from 'react-dom';
import Counter from './counter';


export default function(rootEl: HTMLElement) {
    const state = 0;
    render(
        <Counter count={ state } />,
        rootEl
    )
}