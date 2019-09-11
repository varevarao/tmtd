import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragButton from '../components/drag-button';
import FAIcon from '../components/fa-icon';
import { showHeader, showModal } from '../store/actions/ui';
import '../styles/pages/dashboard.scss';

class Dashboard extends Component {
    componentDidMount() {
        const { toggleHeader } = this.props;

        toggleHeader();
    }

    render() {
        const { toggleModal } = this.props;
        return (
            <div className="dashboard-container">
                <DragButton className="create-button" onClick={() => toggleModal()}>
                    <FAIcon icon='plus' />
                </DragButton>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    toggleHeader: () => dispatch(showHeader()),
    toggleModal: (type, props) => dispatch(showModal(type, props))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);