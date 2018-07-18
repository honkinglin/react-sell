import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Goods from '../components/goods';
import Ratings from '../components/ratings';
import Seller from '../components/seller';

export default class RouterMap extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/goods' component={Goods} />
                <Route exact path='/ratings' component={Ratings} />
                <Route exact path='/seller' component={Seller} />
                <Redirect to='/goods' />
            </Switch>
        );
    }
}
