import React from 'react';
import './index.scss';

import Star from '../star/index.jsx';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailShow: false,
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        };
    }

    render() {
        return (
            <div className='header'>
                <div className='content-wrapper'>
                    <div className='avatar'>
                        <img width='64' height='64' src={this.props.seller.avatar} />
                    </div>
                    <div className='content'>
                        <div className='title'>
                            <span className='brand'></span>
                            <span className='name'>{this.props.seller.name}</span>
                        </div>
                        <div className='description'>
                            {this.props.seller.description} / {this.props.seller.deliveryTime} 分钟送达
                        </div>
                        <div className='support'>
                            <span className={'icon ' + this.state.classMap[this.props.seller.supports && this.props.seller.supports[0].type]}></span>
                            <span className='text'>{this.props.seller.supports && this.props.seller.supports[0].description} </span>
                        </div>
                    </div>
                    <div className="support-count" onClick={this.showDetail.bind(this)}>
                        <span className="count">{this.props.seller.supports && this.props.seller.supports.length}个</span>
                        <i className="icon-keyboard_arrow_right"></i>
                    </div>
                </div>
                <div className="bulletin-wrapper" onClick={this.showDetail.bind(this)}>
                    <span className="bulletin-title"></span><span className="bulletin-text">{this.props.seller.bulletin}</span>
                    <i className="icon-keyboard_arrow_right"></i>
                </div>
                <div className="background">
                    <img src={this.props.seller.avatar} width="100%" height="100%" />
                </div>

                <div className={'detail' + (this.state.detailShow ? ' show' : '')}>
                    <div className="detail-wrapper">
                        <div className="detail-main">
                            <h1 className="name">{this.props.seller.name}</h1>
                            <div className="star-wrapper">
                                <Star size="48" score={this.props.seller.score} />
                            </div>
                            <div className="title">
                                <div className="line"></div>
                                <div className="text">优惠信息</div>
                                <div className="line"></div>
                            </div>
                            <ul className="supports">
                                {this.props.seller.supports && this.props.seller.supports.map((item,index) => (
                                    <li className="support-item" key={`supports-item${index}`}>
                                        <span className={'icon ' + this.state.classMap[this.props.seller.supports[index].type]}></span>
                                        <span className="text">{this.props.seller.supports[index].description}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="title">
                                <div className="line"></div>
                                <div className="text">商家公告</div>
                                <div className="line"></div>
                            </div>
                            <div className="bulletin">
                                <p className="content">{this.props.seller.bulletin}</p>
                            </div>
                        </div>
                    </div>
                    <div className="detail-close" onClick={this.hideDetail.bind(this)}>
                        <i className="icon-close"></i>
                    </div>
                </div>

            </div>
        );
    }

    showDetail() {
        this.setState({
            detailShow: true,
        });
    }
    hideDetail() {
        this.setState({
            detailShow: false,
        });
    }
}
