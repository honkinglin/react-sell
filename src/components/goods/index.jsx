import React from 'react';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';

import './index.scss';
import Food from '../food';
import CartControl from '../cartcontrol';
import ShopCart from '../shopcart';
import { getGoods } from '@api';

export default class Goods extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {},
            selectFoods: [],
            currentIndex: 0,
            menuList: [],
            foodList: []
        };
    }

    componentWillMount() {
        getGoods().then(res => {
            // console.log('goods', res.data.data);
            if (res.data.error === 0) {
                this.setState({ goods: res.data.data });
            }
        });
    }

    componentDidMount() {
        // 初始化滚动
        this._initScroll();
        // 使用黑魔法，将缓存函数延迟到dom真正渲染之后再触发
        setTimeout(() => this._calculateHeight(), 0);
    }

    componentDidUpdate() {
        // this.selectFoods();
    }

    render() {
        return [
            <div className="goods" key="goods">
                <div className="menu-wrapper" ref="menuWrapper">
                    <ul>
                        {
                            this.state.goods.length > 0 && this.state.goods.map((item, index) => (
                                <li className={'menu-item' + (this.currentIndex()===index ? ' current' : '')}
                                    onClick={(ev) => {this.selectMenu(index, ev);}} ref={(node) => {this.state.menuList[index] = node;}} key={'menuList' + index}>
                                    <span className="text border-1px">
                                        <span className={'icon ' + this.state.classMap[item.type]} style={item.type > 0 ? {} : {display: 'none'}}></span>{item.name}                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="foods-wrapper" ref="foodsWrapper">
                    <ul>
                        {
                            this.state.goods.length > 0 && this.state.goods.map((item, index) => (
                                <li className="food-list food-list-hook" ref={(node) => {this.state.foodList[index] = node;}} key={'foodList' + index}>
                                    <h1 className="title">{item.name}</h1>
                                    <ul>
                                        {
                                            item.foods.map((food, index) => (
                                                <li onClick={(e) => {this.selectFood(food, e);}} className="food-item border-1px" key={'food' + index}>
                                                    <div className="icon">
                                                        <img width="57" height="57" src={food.icon} />
                                                    </div>
                                                    <div className="content">
                                                        <h2 className="name">{food.name}</h2>
                                                        <p className="desc">{food.description}</p>
                                                        <div className="extra">
                                                            <span className="count">月售{food.sellCount}份</span><span>好评率{food.rating}%</span>
                                                        </div>
                                                        <div className="price">
                                                            <span className="now">￥{food.price}</span><span className='old' style={food.oldPrice ? {} : {display: 'none'}}>￥{food.oldPrice}</span>
                                                        </div>
                                                        <div className="cartcontrol-wrapper">
                                                            <CartControl
                                                                add={this.addFood.bind(this)}
                                                                cut={this.cutFood.bind(this)}
                                                                food={food} />
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <ShopCart ref="shopcart"
                    add={this.addFood.bind(this)}
                    cut={this.cutFood.bind(this)}
                    empty={this.empty.bind(this)}
                    selectFoods={this.state.selectFoods}
                    deliveryPrice={this.context.seller.deliveryPrice}
                    minPrice={this.context.seller.minPrice} />
            </div>,
            <Food food={this.state.selectedFood} add={(e, food) => {this.addFood(e, food);}} ref="food" key="food" />
        ];
    }
    // 初始化滚动
    _initScroll() {
        this.meunScroll = new BScroll(this.refs.menuWrapper, { click: true });

        this.foodsScroll = new BScroll(this.refs.foodsWrapper, {
            click: true,
            probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
            // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
            if (pos.y <= 0) {
                this.setState({ scrollY: Math.abs(Math.round(pos.y)) });
            }
        });
    }

    // 获取当前展示列表索引
    currentIndex() {
        const len = this.state.listHeight.length;
        for (let i = 0; i < len; i++) {
            let height1 = this.state.listHeight[i];
            let height2 = this.state.listHeight[i + 1];
            if (!height2 || (this.state.scrollY >= height1 && this.state.scrollY < height2)) {
                this._followScroll(i);
                return i;
            }
        }
        return 0;
    }
    // 缓存列表高度
    _calculateHeight() {
        const foodList = this.state.foodList;
        let height = 0;
        this.state.listHeight.push(height);
        foodList.forEach((item) => {
            height += item.clientHeight;
            this.state.listHeight.push(height);
        });
    }
    // 菜单跟随滚动
    _followScroll(index) {
        const menuList = this.state.menuList;
        const el = menuList[index];
        this.meunScroll.scrollToElement(el, 300, 0, -100);
    }
    // 点击菜单
    selectMenu(index) {
        const foodList = this.state.foodList;
        const el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
    }
    // 点击查看食物
    selectFood(food, e) {
        e.stopPropagation();
        this.setState({ selectedFood: food });
        this.refs.food.show();
    }
    selectFoods() {
        const foods = [];
        this.state.goods.forEach((good) => {
            good.foods.forEach((food) => {
                if (food.count) foods.push(food);
            });
        });
        this.setState({ selectFoods: foods });
    }

    // 添加食物
    addFood(e) {
        // 强制组件更新 直接进入第6步
        this.selectFoods();
        this.forceUpdate();
        this._drop(e.target);
    }
    cutFood() {
        // 强制组件更新 直接进入第6步
        this.selectFoods();
        this.forceUpdate();
    }
    // 清空购物车
    empty() {
        const foods = [];
        this.state.selectFoods.forEach((food) => {
            food.count = 0;
            foods.push(food);
        });
        this.setState({ selectFoods: foods });
        this.forceUpdate();
    }
    // 小球下落
    _drop(e) {
        this.refs.shopcart.drop(e);
    }
}

Goods.contextTypes = {
    seller: PropTypes.object
};
