import React from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';

import './index.scss';
import Star from '../star';
import Split from '../split';
import RatingSelect from '../ratingselect';

import { getRatings } from '@api';
import { formatDate } from '@assets/js/date';

const ALL = 2;

export default class Ratings extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            ratings: [],
            selectType: ALL,
            onlyContent: true
        };
    }

    componentWillMount() {
        getRatings().then(res => {
            // console.log('ratings', res.data);
            if (res.data.error === 0) {
                this.setState({
                    ratings: res.data.data
                });
            }
        });
    }

    componentDidMount() {
        this.scroll = new BScroll(this.refs.ratings, { click: true });
    }

    componentDidUpdate() {
        this.scroll.refresh();
    }

    render() {
        return (
            <div className="ratings" ref="ratings">
                <div className="ratings-content">
                    <div className="overview">
                        <div className="overview-left">
                            <h1 className="score">{this.context.seller.score}</h1>
                            <div className="title">综合评分</div>
                            <div className="rank">高于周边商家{this.context.seller.rankRate}%</div>
                        </div>
                        <div className="overview-right">
                            <div className="score-wrapper">
                                <span className="title">服务态度</span>
                                <Star size="36" score={this.context.seller.serviceScore} />
                                <span className="score">{this.context.seller.serviceScore}</span>
                            </div>
                            <div className="score-wrapper">
                                <span className="title">商品评分</span>
                                <Star size="36" score={this.context.seller.foodScore} />
                                <span className="score">{this.context.seller.foodScore}</span>
                            </div>
                            <div className="delivery-wrapper">
                                <span className="title">送达时间</span>
                                <span className="delivery">{this.context.seller.deliveryTime}分钟</span>
                            </div>
                        </div>
                    </div>
                    <Split />
                    <RatingSelect select={(type) => {this.selectRating(type);}}
                        toggle={this.toggleContent.bind(this)}
                        selectType={this.state.selectType}
                        onlyContent={this.state.onlyContent}
                        ratings={this.state.ratings} />
                    <div className="rating-wrapper">
                        <ul>
                            {
                                this.state.ratings.map((rating, index) => (
                                    <li key={'rating' + index} style={this.needShow(rating.rateType, rating.text) ? {} : {display: 'none'}} className="rating-item">
                                        <div className="avatar">
                                            <img width="28" height="28" src={rating.avatar} />
                                        </div>
                                        <div className="content">
                                            <h1 className="name">{rating.username}</h1>
                                            <div className="star-wrapper">
                                                <Star size="24" score={rating.score} />
                                                <span className="delivery" style={rating.deliveryTime ? {} : {display:'none'}}>{rating.deliveryTime}</span>
                                            </div>
                                            <p className="text">{rating.text}</p>
                                            <div className="recommend" stype={(rating.recommend && rating.recommend.length) ? {} : {display: 'none'}}>
                                                <span className="icon-thumb_up"></span>
                                                {
                                                    rating.recommend && rating.recommend.map((item, index) => (
                                                        <span className="item" key={'rating-recommend' + index}>item</span>
                                                    ))
                                                }
                                            </div>
                                            <div className="time">
                                                {this.formatDate(rating.rateTime)}
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    needShow(type, text) {
        if (this.state.onlyContent && !text) {
            return false;
        }
        if (this.state.selectType === ALL) {
            return true;
        } else {
            return type === this.state.selectType;
        }
    }

    selectRating(type) {
        this.setState({
            selectType: type
        });
    }

    toggleContent() {
        this.setState({
            onlyContent: !this.state.onlyContent
        });
    }

    formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
}

Ratings.contextTypes = {
    seller: PropTypes.object
};
