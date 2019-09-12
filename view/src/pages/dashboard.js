import { Popper, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragButton from '../components/drag-button';
import FAIcon from '../components/fa-icon';
import { showHeader, showModal } from '../store/actions/ui';
import '../styles/pages/dashboard.scss';

class Dashboard extends Component {
    state = {
        menuVisible: false
    }

    componentDidMount() {
        const { toggleHeader } = this.props;

        toggleHeader();
    }

    render() {
        const { toggleModal } = this.props;
        const { menuVisible } = this.state;
        return (
            <div className="dashboard-container">

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
                        <ListItem onClick={() => console.log('option 1 clicked')}>
                            <ListItemIcon>
                                <FAIcon icon='plus' />
                            </ListItemIcon>
                            <ListItemText>
                                <span>A menu option</span>
                            </ListItemText>
                        </ListItem>
                        <ListItem onClick={() => console.log('option 2 clicked')}>
                            <ListItemIcon>
                                <FAIcon icon='plus' />
                            </ListItemIcon>
                            <ListItemText>
                                <span>Another menu option</span>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <span className="popper-arrow"></span>
                </Popper>
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