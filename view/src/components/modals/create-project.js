import { Button, Card, CardActions, CardContent, FormControl, FormGroup, FormLabel, OutlinedInput, TextareaAutosize } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideLoader, hideModal, showLoader } from '../../store/actions/ui';
import { createProject } from '../../store/actions/user';
import FAIcon from '../fa-icon';

export class CreateProject extends Component {
    static propTypes = {
        // prop: PropTypes
    }

    state = {
        title: '',
        group: '',
        notes: '',
        tags: [],
        error: ''
    }

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    async handleSubmit() {
        const { toggleLoader, create, onClose } = this.props;
        const { title, group, notes, tags } = this.state;
        try {
            toggleLoader(true);

            await create({ title, group, notes, tags });

            onClose();
        } catch (e) {
            this.setState({ error: (typeof e === 'string' ? e : e.message) });
        } finally {
            toggleLoader(false);
        }
    }

    render() {
        const { onClose } = this.props;
        const { title, group, notes, tags, error } = this.state;

        return (
            <Card className="modal-card create-project">
                <CardContent>
                    <div className="form-header">
                        <span>
                            <FAIcon className='header-icon' icon='folder-plus' />
                            <span className="form-title"><span>{'//TODO:'}</span> Project</span>
                        </span>
                        <span className='header-close' onClick={onClose}><FAIcon icon='close' /></span>
                    </div>
                    <div className="modal-content">
                        <FormGroup className="project-form">
                            <FormControl className="name">
                                <FormLabel>Title</FormLabel>
                                <OutlinedInput className="input-text" type="text"
                                    name="title"
                                    placeholder="A cool title"
                                    value={title}
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>
                            <div className="">
                                <details open={!!group}>
                                    <summary>Group</summary>
                                    <FormControl className="group">
                                        <OutlinedInput type="text"
                                            name="group"
                                            placeholder="Assign to a group"
                                            value={group}
                                            onChange={this.handleInputChange}
                                        />
                                    </FormControl>
                                </details>
                            </div>
                            <div className="">
                                <details open={!!notes}>
                                    <summary>Notes</summary>
                                    <FormControl className="notes">
                                        <TextareaAutosize className="multiline" rows={5}
                                            name="notes"
                                            placeholder="Notes.."
                                            value={notes}
                                            onChange={this.handleInputChange}
                                        />
                                    </FormControl>
                                </details>
                            </div>
                        </FormGroup>
                    </div>
                </CardContent>
                <div className="error">
                    <span>{error}</span>
                </div>
                <CardActions className="form-actions">
                    <Button variant="contained" onClick={this.handleSubmit}>
                        <span>Save</span>
                    </Button>
                    <Button variant="text" onClick={onClose}>
                        <span>Cancel</span>
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
    onClose: () => dispatch(hideModal()),
    toggleLoader: show => show ? dispatch(showLoader()) : dispatch(hideLoader()),
    create: deets => dispatch(createProject(deets))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
