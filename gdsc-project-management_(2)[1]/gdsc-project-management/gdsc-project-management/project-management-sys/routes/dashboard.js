const express = require('express');
const router = express.Router();
const projectController = require('../controller/project');

router.post('/',projectController.createProject);
router.get('/',projectController.getProjects);
router.get('/:id',projectController.getProjectsById);
router.put('/:id',projectController.updateProject);
router.delete('/:id',projectController.deleteProject);

module.exports = router;
