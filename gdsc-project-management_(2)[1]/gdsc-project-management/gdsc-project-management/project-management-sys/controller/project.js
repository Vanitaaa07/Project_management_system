const Project = require('../models/project');

//Add a project 
exports.createProject = async(req,res)=>{
    const {name, githubLink, thumbnail, liveLink, techStack} = req.body;
    const userId = req.user.userId;
    
    try{

        const project = new Project({
            name,
            githubLink,
            thumbnail,
            liveLink,
            techStack,
            createdBy: userId
        });

        await project.save();
        res.status(201).json({ message: 'Project created successfully!',project})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding projects', error: error.message });
        
    }
};

//View user projects
exports.getProjects = async(req,res)=>{
    const userId = req.user.userId;

    try{

        
        const projects = await Project.find({ createdBy: userId }).populate('createdBy', 'name email');

        if (projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for this user' });
        }

        res.status(200).json(projects);

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching projects',error: error.message });
    }
};

//get project by id 
exports.getProjectsById = async(req,res)=>{
    const { id } = req.params;

    try{

        const project = await Project.findById(id).populate('createdBy', 'name email');
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.createdBy._id.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to access this project' });
        }

        res.status(200).json(project);

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching project.' });
    }
};

//Edit project
exports.updateProject = async(req,res)=>{
    const { id } =req.params;
    const {name, githubLink, thumbnail, liveLink, techStack} = req.body;

    try {

        const project = await Project.findOneAndUpdate(
            { _id: id, createdBy: req.user.userId },
            {$set: { name, githubLink, thumbnail, liveLink, techStack} },
            { new: true, runValidators: true }
        );
        /*const project = await Project.findByIdAndUpdate(id,{
            name,
            githubLink,
            thumbnail,
            liveLink,
            techStack
        },{ new: true});*/

        if(!project){
            return res.status(404).json({ message: 'Project not found or not authorised'});
        }

       /* if (project.createdBy && project.createdBy.toString() !== req.user.userId) {
            return res.status(403).send('Not authorized');
        }*/

        res.status(200).json({message: 'Project updated successfully!',project});;

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating project',error: error.message});
    }
};

//Delete a Project
exports.deleteProject = async(req,res)=>{
    const { id } = req.params;
    const userId = req.user.userId;

    try{
        const project = await Project.findById(id);
        if(!project){
            return res.status(404).json({ message: 'Project not found'});
        }

        if (project.createdBy.toString() !== userId) {
            return res.status(403).send('Not authorized');
        }

        await Project.deleteOne({ _id: id });

        res.status(200).json({message: 'Project deleted!',project});;

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting project',error: error.message});
    }
};