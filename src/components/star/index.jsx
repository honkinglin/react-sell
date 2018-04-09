import React from 'react';

import './index.scss';
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

function StarItem(props) {
    const result = [];
    const score = Math.floor(props.score * 2) / 2;
    const hasDecimal = score % 1 !== 0;
    const integer = Math.floor(score);
    for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
    }
    if (hasDecimal) {
        result.push(CLS_HALF);
    }
    while (result.length < LENGTH) {
        result.push(CLS_OFF);
    }
    return result.map((item, index) => <span className={'star-item ' + result[index]} key={index}></span>);
}

export default class Star extends React.Component {
    render() {
        return (
            <div className={'star ' + this.starType()}>
                <StarItem score={this.props.score} />
            </div>
        );
    }
    starType() {
        return 'star-' + this.props.size;
    }
}
