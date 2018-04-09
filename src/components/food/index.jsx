import React from 'react';
import BScroll from 'better-scroll';

import './index.scss';
import Split from '../split';
import CartControl from '../cartcontrol';
import RatingSelect from '../ratingselect';
import {formatDate} from '@assets/js/date.js';

const ALL = 2;

export default class Food extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        };
    }

    componentDidMount() {
        this.scroll = new BScroll(this.refs.food, { click: true });
    }

    componentDidUpdate() {
        this.scroll.refresh();
    }

    render() {
        return (
            <div className={'food' + (this.state.showFlag ? '' : ' hide')} ref="food">
                <div className="food-content">
                    <div className="image-header">
                        <img src={this.props.food.image} />
                        <div className="back" onClick={this.hide.bind(this)}>
                            <i className="icon-arrow_lift"></i>
                        </div>
                    </div>
                    <div className="content">
                        <h1 className="title">{this.props.food.name}</h1>
                        <div className="detail">
                            <span className="sell-count">月售{this.props.food.sellCount}份</span>
                            <span className="rating">好评率{this.props.food.rating}%</span>
                        </div>
                        <div className="price">
                            <span className="now">￥{this.props.food.price}</span><span className="old" style={this.props.food.oldPrice ? {} : {display: 'none'}}>￥{this.props.food.oldPrice}</span>
                        </div>
                        <div className="cartcontrol-wrapper">
                            <CartControl add={(e, food) => {this.addFood(e, food);}} food={this.props.food} />
                        </div>
                        <div onClick={(e) => {this.addFirst(e);}} className="buy" style={(!this.props.food.count || this.props.food.count===0) ? {} : {display: 'none'}}>加入购物车</div>
                    </div>
                    <Split style={this.props.food.info ? {} : {display: 'none'}} />
                    <div className="info" style={this.props.food.info ? {} : {display: 'none'}}>
                        <h1 className="title">商品信息</h1>
                        <p className="text">{this.props.food.info}</p>
                    </div>
                    <Split />
                    <div className="rating">
                        <h1 className="title">商品评价</h1>
                        <RatingSelect
                            select={(type) => {this.selectRating(type);}}
                            toggle={() => {this.toggleContent();}}
                            selectType={this.state.selectType}
                            onlyContent={this.state.onlyContent}
                            desc={this.state.desc}
                            ratings={this.props.food.ratings} />
                        <div className="rating-wrapper">
                            <ul style={(this.props.food.ratings && this.props.food.ratings.length) ? {} : {display: 'none'}}>
                                {
                                    this.props.food.ratings && this.props.food.ratings.map((rating, index) => (
                                        <li key={'rating' + index}
                                            className="rating-item border-1px"
                                            style={this.needShow(rating.rateType, rating.text) ? {} : {display: 'none'}} >
                                            <div className="user">
                                                <span className="name">{rating.username}</span>
                                                <img className="avatar" width="12" height="12" src={rating.avatar} />
                                            </div>
                                            <div className="time">{this.formatDate(rating.rateTime)}</div>
                                            <p className="text">
                                                <span className="{(rating.rateType===0) ? 'icon-thumb_up' : (rating.rateType===1 ? 'icon-thumb_down' : '')}"></span>{rating.text}
                                            </p>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="no-rating" style={(!this.props.food.ratings || !this.props.food.ratings.length) ? {} : {display: 'none'}}>暂无评价</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // 格式化时间
    formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
    // 展示购物车列表
    show() {
        this.setState({
            showFlag: true,
            selectType: ALL,
            onlyContent: true,
        });
    }
    // 隐藏购物车列表
    hide() {
        this.setState({ showFlag: false });
    }
    // 加入购物车
    addFirst(e) {
        this.props.food.count = 1;
        this.props.add(e);
    }
    // 增加商品
    addFood(e) {
        this.props.add(e);
    }
    // 勾选只看内容
    toggleContent() {
        this.setState({ onlyContent: !this.state.onlyContent });
    }
    // 查看评价类别
    selectRating(type) {
        this.setState({ selectType: type });
    }
    // 展示不同评价类别
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
}
