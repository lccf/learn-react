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
    position: string;
    dispatch: any;
}

class Text extends React.Component<TextProps, any> {
    constructor(props: TextProps) {
        super(props);
    }

    updateHandler() {
        let { dispatch, position } = this.props;
        let input = this.refs['myInput'] as HTMLInputElement;
        this.props.dispatch(actionUpdate(input.value, position));
    }

    render() {
        const { data } = this.props;
        return (
            <div>
            <p>
                <input ref="myInput" type="text" defaultValue={data.text} />
                <button onClick={ () => this.updateHandler() }>update</button>
            </p>
            <h3>text: {data.text}</h3>
            </div>
        );
    }
}

export default Text;