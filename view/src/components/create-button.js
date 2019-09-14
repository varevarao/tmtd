import { List, ListItem, ListItemIcon, ListItemText, Popper } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uid } from 'react-uid';
import DragButton from '../components/drag-button';
import FAIcon from '../components/fa-icon';
import { MODAL_TYPE } from '../components/modals';
import { showModal } from '../store/actions/ui';

const CREATE_OPTIONS = [
    {
        type: MODAL_TYPE.CREATE_PROJECT,
        title: 'Project',
        icon: 'folder-plus'
    },
    {
        type: MODAL_TYPE.CREATE_UPDATE,
        title: 'Update',
        icon: 'calendar-plus'
    },
    {
        type: MODAL_TYPE.CREATE_BILL,
        title: 'Bill',
        icon: 'invoice'
    },
]

export class CreateButton extends Component {
    static propTypes = {
        // prop: PropTypes
    }

    state = {
        menuVisible: false
    }

    handleAction(type) {
        const { toggleModal } = this.props;
        const { menuVisible } = this.state;

        toggleModal(type);
        this.setState({ menuVisible: !menuVisible })
    }

    render() {
        const { menuVisible } = this.state;

        return (
            <>
                {/* Draggable create button */}
                <DragButton
                    disabled={menuVisible}
                    bounds='.dashboard-container'
                    className={`create-button ${menuVisible ? 'active' : ''}`}
                    onClick={() => this.setState({ menuVisible: !menuVisible })}
                >
                    <FAIcon icon='plus' />
                </DragButton>
                {/* Popper menu bound to the button */}
                <Popper
                    id={menuVisible ? 'create-popper' : undefined}
                    open={menuVisible}
                    className="create-popper"
                    anchorEl={document.querySelector('.create-button')}
                    modifiers={{
                        arrow: {
                            enabled: true,
                            element: '.popper-arrow'
                        }
                    }}
                >
                    <List className="popper-menu">
                        {
                            CREATE_OPTIONS.map((item, index) => (
                                <ListItem key={uid(item, index)} onClick={() => this.handleAction(item.type)}>
                                    <ListItemIcon>
                                        <FAIcon icon={item.icon || 'plus'} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <span>{item.title}</span>
                                    </ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                    <span className="popper-arrow"></span>
                </Popper>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    toggleModal: (type, props) => dispatch(showModal(type, props))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateButton)
