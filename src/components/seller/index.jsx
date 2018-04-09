import React from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';

import './index.scss';
import Star from '../star';
import Split from '../split';
import {saveToLocal, loadFromLocal} from '@assets/js/store';

export default class Seller extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            favorite: (() => loadFromLocal(this.context.seller.id, 'favorite', false))(),
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        };
    }

    componentDidMount() {
        this._initScroll();
        this._initPics();
    }

    componentDidUpdate() {
        this._initScroll();
        this._initPics();
    }

    render() {
        return (
            <div className="seller" ref="seller">
                <div className="seller-content">
                    <div className="overview">
                        <h1 className="title">{this.context.seller.name}</h1>
                        <div className="desc border-1px">
                            <Star size="36" score={this.context.seller.score} />
                            <span className="text">({this.context.seller.ratingCount})</span>
                            <span className="text">月售{this.context.seller.sellCount}单</span>
                        </div>
                        <ul className="remark">
                            <li className="block">
                                <h2>起送价</h2>
                                <div className="content">
                                    <span className="stress">{this.context.seller.minPrice}</span>元
                                </div>
                            </li>
                            <li className="block">
                                <h2>商家配送</h2>
                                <div className="content">
                                    <span className="stress">{this.context.seller.deliveryPrice}</span>元
                                </div>
                            </li>
                            <li className="block">
                                <h2>平均配送时间</h2>
                                <div className="content">
                                    <span className="stress">{this.context.seller.deliveryTime}</span>分钟
                                </div>
                            </li>
                        </ul>
                        <div className="favorite" onClick={this.toggleFavorite.bind(this)}>
                            <span className={'icon-favorite' + (this.state.favorite ? ' active' : '')}></span>
                            <span className="text">{this.state.favorite ? '已收藏' : '收藏'}</span>
                        </div>
                    </div>
                    <Split />
                    <div className="bulletin">
                        <h1 className="title">公告与活动</h1>
                        <div className="content-wrapper border-1px">
                            <p className="content">{this.context.seller.bulletin}</p>
                        </div>
                        {
                            this.context.seller.supports ? (
                                <ul v-if="seller.supports" className="supports">
                                    {
                                        this.context.seller.supports.map((item, index) => (
                                            <li className="support-item border-1px" key={'support-item' + index}>
                                                <span className={'icon ' + (this.state.classMap[this.context.seller.supports[index].type])}></span>
                                                <span className="text">{this.context.seller.supports[index].description}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : ''
                        }
                    </div>
                    <Split />
                    <div className="pics">
                        <h1 className="title">商家实景</h1>
                        <div className="pic-wrapper" ref="picWrapper">
                            <ul className="pic-list" ref="picList">
                                {
                                    this.context.seller.pics && this.context.seller.pics.map((pic, index) => (
                                        <li className="pic-item" key={'pic-item' + index}>
                                            <img src={pic} width="120" height="90" />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <Split />
                    <div className="info">
                        <h1 className="title border-1px">商家信息</h1>
                        <ul>
                            {
                                this.context.seller.infos && this.context.seller.infos.map((info, index) => (
                                    <li className="info-item" key={'info-item' + index}>{info}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    toggleFavorite() {
        this.setState({
            favorite: !this.state.favorite
        });
        saveToLocal(this.context.seller.id, 'favorite', !this.state.favorite);
    }

    _initScroll() {
        if (!this.scroll) {
            this.scroll = new BScroll(this.refs.seller, {
                click: true
            });
        } else {
            this.scroll.refresh();
        }
    }

    _initPics() {
        if (this.context.seller.pics) {
            const picWidth = 120;
            const margin = 6;
            const width = (picWidth + margin) * this.context.seller.pics.length - margin;
            this.refs.picList.style.width = width + 'px';
            if (!this.picScroll) {
                this.picScroll = new BScroll(this.refs.picWrapper, {
                    scrollX: true,
                    eventPassthrough: 'vertical'
                });
            } else {
                this.picScroll.refresh();
            }
        }
    }
}

Seller.contextTypes = {
    seller: PropTypes.object
};
