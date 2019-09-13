import {project as actionTypes} from './actionTypes';

export const saveProject = (projectConfig) => ({
    type: actionTypes.CREATE,
    payload: projectConfig
})

export const createProject = (projectConfig) => dispatch => {
    
}
