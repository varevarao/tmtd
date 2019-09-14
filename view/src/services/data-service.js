import AuthenticationService from "./authentication-service";

class _DataService {
    constructor() {
        this.domain = (process.env.REACT_APP_API_HOST || '') + '/api';
    }

    getUserProfile() {
        return this._dataRequest('user/profile', {
            method: 'GET'
        }).then(({ user }) => user);
    }

    postNewProject({ title, group, notes, tags }) {
        return this._dataRequest('project/create', {
            method: 'POST',
            body: {
                title,
                group,
                notes,
                tags
            }
        }).then(({ project }) => {
            return project;
        })
    }
    
    updateProject({ id, title, group, notes, tags }) {
        return this._dataRequest(`project/update/${id}`, {
            method: 'POST',
            body: {
                title,
                group,
                notes,
                tags
            }
        }).then(({ project }) => {
            return project;
        })
    }

    deleteProject(id) {
        
    }

    _dataRequest(path, options) {
        return AuthenticationService.fetch(`${this.domain}/${path}`, options).catch(err => AuthenticationService._handleError(err));
    }
}

const DataService = new _DataService();
export default DataService;