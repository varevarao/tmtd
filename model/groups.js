const db = require('./_connectionPool');

module.exports = {
    init: () => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS groups (
                id SERIAL,
                name VARCHAR(50) NOT NULL,
                user_id INTEGER REFERENCES users(id),
                created_at TIMESTAMP NOT NULL,
                tags VARCHAR(200),
                notes VARCHAR(2000),
                PRIMARY KEY(id)
            )
        `).catch(err => {
            console.error('Error creating groups schema\n', err);
        })
    },

    fetchID: id => {
        return db.oneOrNone({
            text: `
                SELECT * FROM groups WHERE id = $1
            `,
            values: [id]
        }).catch(err => {
            console.error('Error fetching group by id', err);
            return null;
        })
    },

    fetchForUser: userId => {
        return db.manyOrNone({
            text: `
                SELECT groups.*, users.email as user_email FROM groups, users WHERE groups.user_id = users.id AND groups.user_id = $1
            `,
            values: [userId]
        }).catch(err => {
            console.error('Error fetching groups for user', err);
            return null;
        })
    },

    fetchByName: (userId, name) => {
        return db.manyOrNone({
            text: `
                SELECT * FROM groups WHERE user_id = $1 AND name = $2
            `,
            values: [userId, name]
        }).catch(err => {
            console.error('Error by name for user', err);
            return null;
        })
    },

    insert: ({ name, userId, tags, notes }) => {
        return db.one({
            text: `
                INSERT INTO groups (
                    name,
                    user_id,
                    tags,
                    notes,
                    created_at
                )
                VALUES (
                    $1, $2, $3, $4, NOW()
                )
                RETURNING *
            `,
            values: [name, userId, tags, notes]
        }).catch(err => {
            console.error('Error inserting new group', err);
            return false;
        })
    },

    getOrCreate: async ({ userId, name }) => {
        // Get the group, hoping it exists
        group = await fetchByName(userId, name);
        if (!group) {
            // Create a new group
            group = await insert({ name, userId, tags: [], notes: '' });
        }

        return group;
    },

    updateName: ({ id, userId, name }) => {
        return db.oneOrNone({
            text: `
                UPDATE groups
                SET name = $1
                WHERE id = $2 AND user_id = $3
                RETURNING *
            `,
            values: [name, id, userId]
        }).catch(err => {
            console.error('Error updating name for group', err);
            return false;
        })
    },

    updateNotes: ({ id, userId, notes }) => {
        return db.oneOrNone({
            text: `
                UPDATE groups
                SET notes = $1
                WHERE id = $2 AND user_id = $3
                RETURNING *
            `,
            values: [notes, id, userId]
        }).catch(err => {
            console.error('Error updating notes for group', err);
            return false;
        })
    },

    updateTags: ({ id, userId, tags }) => {
        return db.oneOrNone({
            text: `
                UPDATE groups
                SET tags = $1
                WHERE id = $2 AND user_id = $3
                RETURNING *
            `,
            values: [tags.join(','), id, userId]
        }).catch(err => {
            console.error('Error updating tags for group', err);
            return false;
        })
    },

    removegroup: ({ id, userId }) => {
        return db.none({
            text: `
                DELETE FROM groups
                WHERE id = $1 AND user_id = $2
            `,
            values: [id, userId]
        }).then(() => {
            // Success
            return true;
        }).catch(err => {
            console.error('Error removing group', err);
            return false;
        })
    }
}