/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';

interface HelloProps {
    text: string;
}

class Hello extends React.Component<HelloProps, any> {
    constructor(props: HelloProps) {
        super(props);
    }

    render() {
        const { text } = this.props;
        return (
            <div>
            <h1>Hello</h1>
            <h3>text: {text}</h3>
            </div>
        );
    }
}

export default Hello;