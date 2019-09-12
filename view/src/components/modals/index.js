import { Grid, Modal } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../store/actions/ui';
import '../../styles/components/modals.scss';
import CreateBill from './create-bill';
import CreateProject from './create-project';
import CreateUpdate from './create-update';

export const MODAL_TYPE = {
    CREATE_PROJECT: 'CREATE_PROJECT',
    CREATE_UPDATE: 'CREATE_UPDATE',
    CREATE_BILL: 'CREATE_BILL',
}

const MODAL_TYPE_MAP = {
    CREATE_PROJECT: CreateProject,
    CREATE_UPDATE: CreateUpdate,
    CREATE_BILL: CreateBill,
}

class AppModal extends Component {
    render() {
        const { open, type, onClose } = this.props;

        if (!type || !type in MODAL_TYPE_MAP) return null;

        const ModalComponent = MODAL_TYPE_MAP[type];
        return (
            <Modal open={open} onClose={onClose} className="app-modal">
                <Grid container className="modal-container" alignItems="center" justify="center">
                    <Grid item xs={10} md={6}>
                        <ModalComponent />
                    </Grid>
                </Grid>
            </Modal>
        )
    }
}

const mapStateToProps = ({ ui }) => ({
    open: !!ui.modal,
    type: ui.modal ? ui.modal.type : null
})

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(hideModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppModal);