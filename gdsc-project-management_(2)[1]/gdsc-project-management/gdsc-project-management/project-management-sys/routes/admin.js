const express = require('express');

const adminPanel = require('../controller/admin');
const { ADMIN_EMAILS } = require('../config');

const router = express.Router();


router.use((req,res,next)=> {
    
    if(!req.user ||!ADMIN_EMAILS.includes(req.user.email)){
        return res.status(403).send('Admin access required');
    }
    next();
});

router.get('/users',adminPanel.viewUsers);
router.get('/projects',adminPanel.viewProjects);
router.put('/projects/:id',adminPanel.updateProject);
router.delete('/projects/:id',adminPanel.deleteProject);



module.exports = router;
