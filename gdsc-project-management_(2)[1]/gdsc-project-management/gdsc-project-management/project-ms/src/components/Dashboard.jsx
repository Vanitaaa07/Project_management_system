import React, { useState, useEffect } from 'react';
import { fetchProjects, addProject, editProject, deleteProject } from '../api';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        name: '',
        githubLink: '',
        thumbnail: '',
        liveLink: '',
        techStack: ''
    });

    useEffect(() => {
        const getProjects = async () => {
            const response = await fetchProjects();
            setProjects(response.data);
        };
        getProjects();
    }, []);

    const handleChange = (e) => {
        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
        });
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        };
        const response = await addProject(newProject);
        setProjects([...projects, response.data]);
    };

    const handleEditProject = async (id) => {
        const updatedProject = await editProject(id, newProject);
        setProjects(projects.map((project) => (project._id === id ? updatedProject.data : project)));
    };

    const handleDeleteProject = async (id) => {
        await deleteProject(id);
        setProjects(projects.filter((project) => project._id !== id));
    };

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <form onSubmit={handleAddProject}>
                <input type="text" name="name" placeholder="Project Name" onChange={handleChange} />
                <input type="text" name="githubLink" placeholder="GitHub Link" onChange={handleChange} />
                <input type="text" name="thumbnail" placeholder="Thumbnail URL" onChange={handleChange} />
                <input type="text" name="liveLink" placeholder="Live Hosted Link" onChange={handleChange} />
                <input type="text" name="techStack" placeholder="Tech Stack Used" onChange={handleChange} />
                <button type="submit">Add Project</button>
            </form>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>
                        <h2>{project.name}</h2>
                        <p>{project.githubLink}</p>
                        <img src={project.thumbnail} alt={project.name} />
                        <button onClick={() => handleEditProject(project._id)}>Edit</button>
                        <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;

