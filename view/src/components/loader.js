import React from 'react';
import { connect } from 'react-redux';
import '../styles/components/loader.scss';
import FAIcon from './fa-icon';

const Loader = ({ loading }) => (
    <div className={`${loading ? '' : 'hide'} loading-screen`}>
        <div><FAIcon icon='spinner' spin size="5x" /></div>
    </div>
)

const mapStateToProps = ({ ui }) => ({
    loading: !!ui.loader
});


export default connect(mapStateToProps)(Loader);