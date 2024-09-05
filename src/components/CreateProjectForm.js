import React, { useState } from 'react';
import axios from 'axios';

const CreateProjectForm = ({ workspaceId, fetchProjects }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const newProject = { name, description, workspace_id: workspaceId };

    try {
      await axios.post("http://localhost:8000/api/projects/", newProject, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      fetchProjects();
      setName('');
      setDescription('');
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <form onSubmit={handleCreateProject}>
      <div>
        <label>Project Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
};

export default CreateProjectForm;
