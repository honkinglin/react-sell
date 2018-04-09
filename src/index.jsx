import '@assets/scss/index';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Header from './components/header';
import RouterMap from './router';

import {getSeller} from '@api';
import {urlParse} from '@assets/js/util';

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
        return [
            <Header key='header' seller={this.state.seller} />,
            <RouterMap seller={this.state.seller} key='routerMap'/>
        ];
    }
}

App.childContextTypes = {
    seller: PropTypes.object
};

ReactDOM.render(<App />, document.getElementById('App'));
