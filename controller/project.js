const express = require('express');
const router = express.Router();
const projects = require('../services/projects');

const ERRORS = {
    PROJECT_EXISTS: 'Sorry, a project with the same name already exists',
    PROJECT_INSERT_FAILED: 'Something went wrong while creating the project',
    INVALID_BODY: 'Something went wrong while updating the project',
    PROFILE_NOT_FOUND: 'Could not find the requested project',
    PARAMS_MISSING: 'Required parameters are missing'
}

/**
 * Register a new project
 * body:
 * {
 *      title, group, notes, tags
 * }
 * 
 * result:
 * 200
 * {
 *      project
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.post('/create', async function (req, res) {
    const { id: userId } = req.user;
    const { title, group, notes, tags } = req.body;

    // Check if the title is already taken
    const existing = await projects.exists(userId, title);
    if (existing) {
        res.status(400);
        res.send({ error: ERRORS.PROJECT_EXISTS })
    } else {
        // All good, create the user
        const newProject = await projects.createNew({
            title,
            userId,
            clients: [],
            status: 'NEW',
            groupName: group,
            notes,
            tags
        });

        if (!newProject) {
            res.status(500);
            res.send({ error: ERRORS.PROJECT_INSERT_FAILED });
        } else {
            res.status(200);
            res.send({ project: newProject });
        }
    }
});

/**
 * Update the project using the provided params
 * body:
 * {
 *      title, notes, status, tags, group
 * }
 * 
 * result:
 * 200
 * {
 *      project
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.post('/update/:id', async function (req, res) {
    const { id: userId } = req.user;
    const { id } = req.params;
    const { title, notes, status, tags, group } = req.body;

    const updated = await projects.updateProject({ id, userId, title, notes, status, tags, groupName: group });

    if (!updated) {
        res.status(400);
        res.send({ error: ERRORS.INVALID_BODY })
    } else {
        res.status(200);
        res.send({ project: updated });
    }
});

/**
 * Gets the user profile for the requested project
 *
 * result:
 * 200
 * {
 *      project
 * }
 * 400/500
 * {
 *      error
 * }
 */
router.get('/profile/:id', async function (req, res) {
    const { id: userId } = req.user;
    const { id } = req.params;

    const project = await projects.getProfile({ id, userId });
    if (!project) {
        res.status(400);
        res.send({ error: ERRORS.PROFILE_NOT_FOUND })
    } else {
        res.status(200);
        res.send({ project });
    }
});

module.exports = router;