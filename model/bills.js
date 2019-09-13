const db = require('./_connectionPool');

module.exports = {
    init: () => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS bills (
                id SERIAL,
                user_id INTEGER REFERENCES users(id) NOT NULL,
                project_id INTEGER REFERENCES projects(id) NOT NULL,
                status VARCHAR(20) DEFAULT 'NEW',
                created_at TIMESTAMP NOT NULL,
                amount REAL NOT NULL,
                notes VARCHAR(2000),
                tags VARCHAR(200),
                primary key(id)
            )
        `).catch(err => {
            console.error('Error creating BILLS schema\n', err);
        })
    },

    fetchID: id => {
        return db.oneOrNone({
            text: `
                SELECT * FROM bills WHERE id = $1
            `,
            values: [id]
        }).catch(err => {
            console.error('Error fetching bill by id', err);
            return null;
        })
    },

    fetchForUser: userId => {
        return db.manyOrNone({
            text: `
                SELECT bills.*
                FROM bills, users 
                WHERE bills.user_id = users.id AND bills.user_id = $1
            `,
            values: [userId]
        }).catch(err => {
            console.error('Error fetching bills for user', err);
            return null;
        })
    },

    fetchForProject: projectId => {
        return db.manyOrNone({
            text: `
                SELECT bills.*
                FROM bills, projects
                WHERE bills.project_id = projects.id AND bills.project_id = $1
            `,
            values: [projectId]
        }).catch(err => {
            console.error('Error fetching bills for project', err);
            return null;
        })
    },

    fetchByStatus: (userId, status) => {
        return db.manyOrNone({
            text: `
                SELECT * FROM bills WHERE user_id = $1 AND status = $2
            `,
            values: [userId, status]
        }).catch(err => {
            console.error('Error by status for bill', err);
            return null;
        })
    },

    insert: ({ userId, projectId, status, amount, notes, tags }) => {
        return db.one({
            text: `
                INSERT INTO bills (
                    user_id,
                    project_id,
                    status,
                    amount,
                    notes, 
                    tags,
                    created_at
                )
                VALUES (
                    $1, $2, $3, $4, $5, $6, NOW()
                )
                RETURNING *
            `,
            values: [userId, projectId, status, amount, notes, tags.join(',')]
        }).catch(err => {
            console.error('Error inserting new bill', err);
            return false;
        })
    },
}