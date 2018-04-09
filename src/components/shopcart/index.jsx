import React from 'react';
import BScroll from 'better-scroll';

import './index.scss';
import CartControl from '../cartcontrol';

export default class Shopcart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balls: [
                { show: false },
                { show: false },
                { show: false },
                { show: false },
                { show: false }
            ],
            dropBalls: [],
            fold: true
        };
    }

    componentDidMount() {
        this.scroll = new BScroll(this.refs.listContent, { click: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectFoods) {
            let count = 0;
            nextProps.selectFoods.forEach((food) => {
                count += food.count;
            });
            if (count === 0) this.setState({fold: true});
        }
    }

    componentDidUpdate() {
        this.scroll.refresh();
    }

    render() {
        return [
            <div className="shopcart" key="shopcart">
                <div className="content" onClick={this.toggleList.bind(this)}>
                    <div className="content-left">
                        <div className="logo-wrapper">
                            <div className={'logo' + (this.totalCount() > 0 ? ' highlight' : '')}>
                                <i className={'icon-shopping_cart' + (this.totalCount() > 0 ? ' highlight' : '')}></i>
                            </div>
                            <div className="num" style={this.totalCount() > 0 ? {} : {display: 'none'}}>{this.totalCount()}</div>
                        </div>
                        <div className={'price' + (this.totalPrice()>0 ? ' highlight' : '')}>￥{this.totalPrice()}</div>
                        <div className="desc">另需配送费￥{this.props.deliveryPrice}元</div>
                    </div>
                    <div className="content-right" onClick={this.pay.bind(this)}>
                        <div className={'pay ' + this.payClass()}>
                            {this.payDesc()}
                        </div>
                    </div>
                </div>
                <div className="ball-container">
                    {
                        this.state.balls.map((ball, index) => (
                            <div className="ball" style={ball.show ? {} : {display: 'none'}} key={'ball' + index}>
                                <div className="inner inner-hook"></div>
                            </div>
                        ))
                    }
                </div>
                <div className={'shopcart-list' + (!this.state.fold ? ' fade' : '')}>
                    <div className="list-header">
                        <h1 className="title">购物车</h1>
                        <span className="empty" onClick={this.empty.bind(this)}>清空</span>
                    </div>
                    <div className="list-content" ref="listContent">
                        <ul>
                            {
                                this.props.selectFoods && this.props.selectFoods.map((food, index) => (
                                    <li className="food" key={'food' + index}>
                                        <span className="name">{food.name}</span>
                                        <div className="price">
                                            <span>￥{food.price*food.count}</span>
                                        </div>
                                        <div className="cartcontrol-wrapper">
                                            <CartControl add={(event) => {this.addFood(event);}} food={food} />
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>,
            <div key="list-mask" className="list-mask" onClick={this.hideList.bind(this)} style={!this.state.fold ? {} : {display: 'none'}}></div>
        ];
    }

    // 总数量
    totalCount() {
        let count = 0;
        this.props.selectFoods && this.props.selectFoods.forEach((food) => {
            count += food.count;
        });
        return count;
    }
    // 总金额
    totalPrice() {
        let total = 0;
        this.props.selectFoods && this.props.selectFoods.forEach((food) => {
            total += food.price * food.count;
        });
        return total;
    }
    // 显示隐藏购物车列表
    toggleList() {
        if (!this.totalCount()) return;
        this.setState({ fold: !this.state.fold });
    }
    // 支付
    pay() {
        if (this.totalPrice < this.minPrice) return;
        window.alert(`支付${this.totalPrice() + this.props.deliveryPrice}元`);
    }
    // 清空购物车
    empty() {
        this.props.empty();
        this.setState({ fold: true });
    }
    // 隐藏购物车列表
    hideList() {
        this.setState({ fold: true });
    }
    // 添加商品
    addFood(e) {
        // this.drop(e);
        this.props.add(e);
    }
    // 小球
    drop(el) {
        console.log('el', el);
        console.log('小球动画效果！！暂未实现！！待我研究研究!');
    }
    // 展示结算样式
    payClass() {
        if (this.totalPrice() < this.props.minPrice) {
            return 'not-enough';
        } else {
            return 'enough';
        }
    }
    // 展示结算文案
    payDesc() {
        if (this.totalPrice() === 0) {
            return `￥${this.props.minPrice}元起送`;
        } else if (this.state.totalPrice < this.props.minPrice) {
            let diff = this.props.minPrice - this.totalPrice();
            return `还差￥${diff}元起送`;
        } else {
            return '去结算';
        }
    }
}

Shopcart.defaultProps = {
    selectFoods: [],
    deliveryPrice: 0,
    minPrice: 0
};
