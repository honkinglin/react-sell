import React from 'react';
import './index.scss';
import {NavLink} from 'react-router-dom';

export default class Tab extends React.Component {
    render() {
        return (
            <div className='tab' key='tab'>
                <div className='tab-item'>
                    <NavLink to='/goods' activeclassname={'active'}>商品</NavLink>
                </div>
                <div className='tab-item'>
                    <NavLink to='/ratings' activeclassname={'active'}>评价</NavLink>
                </div>
                <div className='tab-item'>
                    <NavLink to='/seller' activeclassname={'active'}>商家</NavLink>
                </div>
            </div>
        );
    }
}
