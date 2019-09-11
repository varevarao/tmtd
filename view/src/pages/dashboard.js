import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/pages/dashboard.scss';

class Dashboard extends Component {
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

})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);