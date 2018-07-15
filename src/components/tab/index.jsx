import React from 'react';
import './index.scss';
import {NavLink} from 'react-router-dom';

const isDev = process.env.NODE_ENV === 'development';
const prefix = '/react-sell/dist';

export default class Tab extends React.Component {
    render() {
        return (
            <div className='tab' key='tab'>
                <div className='tab-item'>
                    <NavLink to={isDev ? '/goods' : `${prefix}/goods`} activeclassname={'active'}>商品</NavLink>
                </div>
                <div className='tab-item'>
                    <NavLink to={isDev ? '/ratings' : `${prefix}/ratings`} activeclassname={'active'}>评价</NavLink>
                </div>
                <div className='tab-item'>
                    <NavLink to={isDev ? '/seller' : `${prefix}/seller`} activeclassname={'active'}>商家</NavLink>
                </div>
            </div>
        );
    }
}
