import { Button, Card, CardActions, CardContent, FormControl, FormGroup, FormLabel, OutlinedInput, TextareaAutosize } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../store/actions/ui';
import FAIcon from '../fa-icon';

export class CreateProject extends Component {
    static propTypes = {
        // prop: PropTypes
    }

    state = {
        title: '',
        group: '',
        notes: '',
        tags: []
    }

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(evt) {
        
    }

    handleSubmit() {

    }

    render() {
        const { onClose } = this.props;
        const { title, group, notes, tags } = this.state;

        return (
            <Card className="modal-card create-project">
                <CardContent>
                    <div className="form-header">
                        <span className="form-title">New Project</span>
                        <span onClick={onClose}><FAIcon icon='close' /></span>
                    </div>
                    <FormGroup className="project-form">
                        <div className="part-1">
                            <FormControl className="name">
                                <FormLabel>Title</FormLabel>
                                <OutlinedInput className="input-text" type="text"
                                    name="title"
                                    placeholder="A cool title"
                                    value={title}
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>
                            <FormControl className="group">
                                <FormLabel>Group</FormLabel>
                                <OutlinedInput type="text"
                                    name="group"
                                    placeholder="Assign to a group"
                                    value={group}
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>
                        </div>
                        <FormControl className="part-2">
                            <FormLabel>Notes</FormLabel>
                            <TextareaAutosize className="multiline" rows={5}
                                name="notes"
                                placeholder="Notes.."
                                value={notes}
                                onChange={this.handleInputChange}
                            />
                        </FormControl>
                    </FormGroup>
                </CardContent>
                <CardActions className="form-actions">
                    <Button color="secondary" variant="contained" onClick={this.handleSubmit}>
                        <span>Save</span>
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

const mapStateToProps = ({ ui }) => ({
    config: ui.modal.props || {}
})

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(hideModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
