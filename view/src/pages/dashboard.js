import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/pages/dashboard.scss';
import { showHeader } from '../store/actions/ui';

class Dashboard extends Component {
    componentDidMount() {
        const { toggleHeader } = this.props;

        toggleHeader();
    }

    render() {
        return (
            <div className="dashboard-container">

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    toggleHeader: () => dispatch(showHeader())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);