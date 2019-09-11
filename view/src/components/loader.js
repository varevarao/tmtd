import React from 'react';
import { connect } from 'react-redux';
import FAIcon, { ICON_MAP } from './fa-icon';

const Loader = ({ loading }) => (
    <div className={`${loading ? '' : 'hide'} loading-screen`}>
        <div><FAIcon icon={ICON_MAP.spinner} spin size="5x" /></div>
    </div>
)

const mapStateToProps = ({ ui }) => ({
    loading: ui.Loader
});


export default connect(mapStateToProps)(Loader);