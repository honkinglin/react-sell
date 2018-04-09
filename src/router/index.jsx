import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Goods from '../components/goods';
import Ratings from '../components/ratings';
import Seller from '../components/seller';
import Tab from '../components/tab';

export default class RouterMap extends React.Component {
    render() {
        return (
            <Router key='router'>
                <div className='section'>
                    <Tab />
                    <Route exact path='/' component={Goods} />
                    <Route path='/goods' component={Goods} />
                    <Route path='/ratings' component={Ratings} />
                    <Route path='/seller' component={Seller} />
                </div>
            </Router>
        );
    }
}
