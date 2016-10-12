/// <reference path="./declare.d.ts" />
import * as React from 'react';
import { connect } from 'react-redux';

import {
    actionUpdate
} from './actions';

interface TextProps {
    data: {
        text: string;
    };
    externalCallback: any;
    dataLabel: string;
    dispatch: any;
}

class Text extends React.Component<TextProps, any> {
    constructor(props: TextProps) {
        super(props);
    }

    updateHandler() {
        let { dispatch, dataLabel } = this.props;
        let input = this.refs['myInput'] as HTMLInputElement;
        dispatch(actionUpdate(input.value, dataLabel));
    }

    render() {
        const { text } = this.props.data;
        return (
            <div>
            <p>
                <input ref="myInput" type="text" defaultValue={text} />
                <button onClick={ () => this.updateHandler() }>update</button>
            </p>
            <h3>text: {text}</h3>
            </div>
        );
    }
}

export default Text;