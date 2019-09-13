const projects = require('../model/projects');
const groups = require('../model/groups');
const bills = require('../model/bills');

const mapProjectModel = ({
    title,
    user_id: userId,
    clients,
    status,
    created_at: createdAt,
    group_id: groupId,
    tags,
    notes,
}, group) => ({
    title, userId, clients, createdAt, status, groupId, group, tags, notes
});

const populateModel = async existing => {
    const project = mapProjectModel(existing);

    // Populate the group
    if (project.groupId && !project.group) {
        project.group = await groups.fetchID(project.groupId);
    }

    project.bills = await bills.fetchForProject(project.id);

    return project;
}

module.exports = {
    exists: async (userId, title) => {
        const existing = await projects.fetchByTitle(userId, title);
        return !!existing;
    },

    createNew: async ({ title, userId, clients, status, groupName, tags, notes }) => {
        let group = { id: null };

        if (groupName) {
            group = await groups.getOrCreate({ userId, name: groupName });
        }

        const project = await projects.insert({
            title,
            userId,
            clients,
            status,
            groupId: group.id,
            tags,
            notes
        })

        return populateModel(mapProjectModel(project, group));
    },

    getProfile: async ({ id, userId }) => {
        const existing = await projects.fetchID({ id, userId });

        if (!!existing) {
            const project = await populateModel(existing);

            return project;
        } else {
            return null;
        }
    },

    getAll: async ({ userId }) => {
        const existing = await projects.fetchForUser(userId);

        if (!!existing) {
            const mapped = await Promise.all(existing.map(populateModel));

            return mapped;
        } else {
            return null;
        }
    },

    updateProject: async ({ id, userId, ...props }) => {
        let project = null;
        if (props.title) project = await projects.updateTitle({ id, userId, ...props });
        if (props.notes) project = await projects.updateNotes({ id, userId, ...props });
        if (props.status) project = await projects.updateStatus({ id, userId, ...props });
        if (props.tags) project = await projects.updateTags({ id, userId, ...props });
        if (props.groupName) {
            const group = await groups.getOrCreate({ userId, name: props.groupName });
            project = await projects.updateGroup({ id, userId, groupId: group.id, ...props });
            project.group = group;
        }

        return project;
    },

    deleteProject: async ({ id, userId }) => {
        const done = await projects.removeProject({ id, userId })
        return done;
    }
}