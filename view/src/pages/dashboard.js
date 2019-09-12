import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateButton from '../components/create-button';
import { showHeader } from '../store/actions/ui';
import '../styles/pages/dashboard.scss';

class Dashboard extends Component {
    componentDidMount() {
        const { toggleHeader } = this.props;

        toggleHeader();
    }

    render() {
        return (
            <div className="dashboard-container">
                <CreateButton />
            </div >
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    toggleHeader: () => dispatch(showHeader())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);