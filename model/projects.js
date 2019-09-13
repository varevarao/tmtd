const db = require('./_connectionPool');

module.exports = {
    init: () => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL,
                title VARCHAR(100) NOT NULL,
                user_id INTEGER REFERENCES users(id) NOT NULL,
                clients VARCHAR(200),
                status VARCHAR(20) DEFAULT 'NEW',
                created_at TIMESTAMP NOT NULL,
                group_id INTEGER REFERENCES groups(id),
                tags VARCHAR(200),
                notes VARCHAR(2000),
                PRIMARY KEY(id)
            )
        `).catch(err => {
            console.error('Error creating projects schema\n', err);
        })
    },

    fetchID: ({ userId, id }) => {
        return db.oneOrNone({
            text: `
                SELECT * FROM projects WHERE id = $1 AND user_id = $2
            `,
            values: [id, userId]
        }).catch(err => {
            console.error('Error fetching project by id', err);
            return null;
        })
    },

    fetchForUser: userId => {
        return db.manyOrNone({
            text: `
                SELECT projects.*, users.email as user_email FROM projects, users WHERE projects.user_id = users.id AND projects.user_id = $1
            `,
            values: [userId]
        }).catch(err => {
            console.error('Error fetching projects for user', err);
            return null;
        })
    },

    fetchForGroup: groupId => {
        return db.manyOrNone({
            text: `
                SELECT projects.*, groups.name as group_name
                FROM projects, groups
                WHERE projects.group_id = groups.id AND projects.group_id = $1
            `,
            values: [groupId]
        }).catch(err => {
            console.error('Error fetching projects for user', err);
            return null;
        })
    },

    fetchByStatus: (userId, status) => {
        return db.manyOrNone({
            text: `
                SELECT * FROM projects WHERE user_id = $1 AND status = $2
            `,
            values: [userId, status]
        }).catch(err => {
            console.error('Error by status for user', err);
            return null;
        })
    },

    fetchByTitle: (userId, title) => {
        return db.manyOrNone({
            text: `
                SELECT * FROM projects WHERE user_id = $1 AND title = $2
            `,
            values: [userId, title]
        }).catch(err => {
            console.error('Error by title for user', err);
            return null;
        })
    },

    insert: ({ title, userId, clients, status, groupId, tags, notes }) => {
        return db.one({
            text: `
                INSERT INTO projects (
                    title,
                    user_id,
                    clients,
                    status,
                    created_at,
                    group_id,
                    tags,
                    notes,
                )
                VALUES (
                    $1, $2, $3, $4, NOW(), $5, $6, $7
                )
                RETURNING *
            `,
            values: [title, userId, clients, status, groupId, tags, notes]
        }).catch(err => {
            console.error('Error inserting new project', err);
            return false;
        })
    },

    updateStatus: ({ id, userId, status }) => {
        return db.oneOrNone({
            text: `
                UPDATE projects
                SET status = $1
                WHERE id = $2 AND user_id = $3
                RETURNING *
            `,
            values: [status, id, userId]
        }).catch(err => {
            console.error('Error updating status for project', err);
            return false;
        })
    },

    updateTitle: ({ id, userId, title }) => {
        return db.oneOrNone({
            text: `
                UPDATE projects
                SET title = $1
                WHERE id = $2 AND user_id = $3
                RETURNING *
            `,
            values: [title, id, userId]
        }).catch(err => {
            console.error('Error updating title for project', err);
            return false;
        })
    },

    updateGroup: ({ id, userId, groupId }) => {
        return db.oneOrNone({
            text: `
                UPDATE projects
                SET group_id = $1
                WHERE id = $2 AND user_id = $3
                RETURNING *
            `,
            values: [groupId, id, userId]
        }).catch(err => {
            console.error('Error updating group for project', err);
            return false;
        })
    },

    updateNotes: ({ id, userId, notes }) => {
        return db.oneOrNone({
            text: `
                UPDATE projects
                SET notes = $1
                WHERE id = $2 AND user_id = $3
                RETURNING *
            `,
            values: [notes, id, userId]
        }).catch(err => {
            console.error('Error updating notes for project', err);
            return false;
        })
    },

    updateTags: ({ id, userId, tags }) => {
        return db.oneOrNone({
            text: `
                UPDATE projects
                SET tags = $1
                WHERE id = $2 AND user_id = $3
                RETURNING *
            `,
            values: [tags.join(','), id, userId]
        }).catch(err => {
            console.error('Error updating tags for project', err);
            return false;
        })
    },

    removeProject: ({ id, userId }) => {
        return db.none({
            text: `
                DELETE FROM projects
                WHERE id = $1 AND user_id = $2
            `,
            values: [id, userId]
        }).then(() => {
            // Success
            return true;
        }).catch(err => {
            console.error('Error removing project', err);
            return false;
        })
    }
}