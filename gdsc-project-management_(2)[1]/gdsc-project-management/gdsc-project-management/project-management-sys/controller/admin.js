const User = require('../models/user');
const Project = require('../models/project');

exports.viewUsers = async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch (error) {
        res.status(500).send('Error fetching users');
    }
};

exports.viewProjects = async (req,res)=>{
    try{
        const projects = await Project.find().populate('createdBy','projectName email');
        res.status(200).json(projects);
    }catch (error) {
        res.status(500).send('Error fetching projects');
    }
};

//Edit any project
exports.updateProject = async(req,res)=>{
    const { id } = req.params;
    const { name, githubLink, thumbnail, liveLink, techStack } = req.body;

    try {
        
        const project = await Project.findByIdAndUpdate(id,{
            name,
            githubLink,
            thumbnail,
            liveLink,
            techStack
        },{ new: true});

        if(!project){
            return res.status(404).json({ message: 'Project not found'});
        }

        /*if (project.createdBy.toString() !== req.user.userId) {
            return res.status(403).send('Not authorized');
        }*/

        res.status(200).json({message: 'Project updated successfully!',project});;

    }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating project', error: error.message });
    }

};

//Delete a Project
exports.deleteProject = async(req,res)=>{
    const { id } = req.params;

    try{
        const project = await Project.findById(id);
        if(!project){
            return res.status(404).json({ message: 'Project not found'});
        }

        await Project.deleteOne({ _id: id });

        res.status(200).json({message: 'Project deleted!',project});;

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting project' });
    }
};


