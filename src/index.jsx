import '@assets/scss/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './components/header';
import Tab from './components/tab';
import RouterMap from './router';

import {getSeller} from '@api';
import {urlParse} from '@assets/js/util';

import './sw.js';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seller: {
                id: (() => {
                    let queryParam = urlParse();
                    return queryParam.id || 1;
                })()
            }
        };
    }
    getChildContext() {
        return { seller: this.state.seller };
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        getSeller().then(res => {
            if (res.data.error === 0) {
                this.setState({
                    seller: Object.assign({}, this.state.seller, res.data.data),
                });
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header key='header' seller={this.state.seller} />
                <Tab key="tab" />
                <RouterMap seller={this.state.seller} key='routerMap'/>
            </React.Fragment>
        );
    }
}

App.childContextTypes = {
    seller: PropTypes.object
};

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('App')
);
