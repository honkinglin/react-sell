import React from 'react';

import './index.scss';

export default class CartControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cartcontrol">
                <div className={'cart-decrease' + (this.props.food && this.props.food.count ? ' move' : '')} onClick={this.decreaseCart.bind(this)}>
                    <span className="inner icon-remove_circle_outline"></span>
                </div>
                <div className="cart-count" style={this.props.food && this.props.food.count ? {} : {display:'none'}}>{this.props.food && this.props.food.count}</div>
                <div className="cart-add icon-add_circle" onClick={this.addCart.bind(this)}></div>
            </div>
        );
    }

    decreaseCart(e) {
        e.stopPropagation();
        if (this.props.food.count) {
            this.props.food.count--;
        }
        this.props.cut(e);
    }

    addCart(e) {
        e.stopPropagation();
        if (!this.props.food.count) {
            this.props.food.count = 1;
        } else {
            this.props.food.count++;
        }
        this.props.add(e);
    }
}
