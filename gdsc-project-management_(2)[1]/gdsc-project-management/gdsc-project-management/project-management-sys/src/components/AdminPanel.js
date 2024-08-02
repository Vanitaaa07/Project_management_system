import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchAllProjects, adminEditProject, adminDeleteProject } from '../api';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetchUsers();
            setUsers(response.data);
        };
        const getProjects = async () => {
            const response = await fetchAllProjects();
            setProjects(response.data);
        };
        getUsers();
        getProjects();
    }, []);

    const handleEditProject = async (id) => {
        const updatedProject = await adminEditProject(id, { name: 'New Name' });
        setProjects(projects.map((project) => (project._id === id ? updatedProject.data : project)));
    };

    const handleDeleteProject = async (id) => {
        await adminDeleteProject(id);
        setProjects(projects.filter((project) => project._id !== id));
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.name} - {user.email}</li>
                ))}
            </ul>
            <h2>Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>
                        <h2>{project.name}</h2>
                        <p>{project.githubLink}</p>
                        <button onClick={() => handleEditProject(project._id)}>Edit</button>
                        <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
