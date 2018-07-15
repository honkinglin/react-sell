import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Goods from '../components/goods';
import Ratings from '../components/ratings';
import Seller from '../components/seller';

const isDev = process.env.NODE_ENV === 'development';
const prefix = '/react-sell/dist';

export default class RouterMap extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={isDev ? '/goods' : `${prefix}/goods`} component={Goods} />
                <Route path={isDev ? '/ratings' : `${prefix}/ratings`} component={Ratings} />
                <Route path={isDev ? '/seller' : `${prefix}/seller`} component={Seller} />
                <Redirect to={isDev ? '/goods' : `${prefix}/goods`} />
            </Switch>
        );
    }
}
