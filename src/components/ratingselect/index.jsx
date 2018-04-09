import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default class RatingSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ratingselect">
                <div className="rating-type border-1px">
                    <span onClick={() => {this.select(2);}} className={'block positive' + (this.props.selectType===2 ? ' active' : '')}>{this.props.desc.all}<span
                        className="count">{this.props.ratings && this.props.ratings.length}</span></span>
                    <span onClick={() => {this.select(0);}} className={'block positive' + (this.props.selectType===0 ? ' active' : '')}>{this.props.desc.positive}<span
                        className="count">{this.props.ratings && this.positives().length}</span></span>
                    <span onClick={() => {this.select(1);}} className={'block positive' + (this.props.selectType===1 ? ' active' : '')}>{this.props.desc.negative}<span
                        className="count">{this.props.ratings && this.negatives().length}</span></span>
                </div>
                <div onClick={this.toggleContent.bind(this)} className={'switch' + (this.props.onlyContent ? ' on' : '')}>
                    <span className="icon-check_circle"></span>
                    <span className="text">只看有内容的评价</span>
                </div>
            </div>
        );
    }

    select(i) {
        this.props.select(i);
    }

    toggleContent() {
        this.props.toggle();
    }

    positives() {
        return this.props.ratings.filter((rating) => {
            return rating.rateType === POSITIVE;
        });
    }

    negatives() {
        return this.props.ratings.filter((rating) => {
            return rating.rateType === NEGATIVE;
        });
    }
}

// 为属性指定默认值:
RatingSelect.defaultProps = {
    ratings: [],
    selectType: ALL,
    onlyContent: false,
    desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
    }
};
