import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = ({ workspaceId }) => {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');



  useEffect(() => {
    if (workspaceId) {
      fetchProjects();  // Fetch projects only if a workspace is selected
    }
  }, [workspaceId]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/projects/?workspace_id=${workspaceId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:8000/api/projects/${projectId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      fetchProjects();  // Refresh project list after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (project) => {
    setEditProject(project);
    setEditName(project.name);
    setEditDescription(project.description);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = {
        name: editName,
        description: editDescription,
      };

      await axios.put(`http://localhost:8000/api/projects/${editProject.id}/`, updatedProject, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });

      setEditProject(null);
      setEditName('');
      setEditDescription('');
      fetchProjects();  // Refresh project list after editing
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditProject(null);
    setEditName('');
    setEditDescription('');
  };

  return (
    <div>
      <h3>Projects</h3>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              {editProject && editProject.id === project.id ? (
                <form onSubmit={handleSaveEdit}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Project Name"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Project Description"
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </form>
              ) : (
                <>
                  <span>{project.name}</span>
                  <button onClick={() => handleEditProject(project)}>Edit</button>
                  <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects in this workspace.</p>
      )}
    </div>
  );
};

export default ProjectList;
