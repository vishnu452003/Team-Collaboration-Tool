import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import axios from "axios";

const Sidebar = ({
  isSidebarOpen,
  workspaces,
  toggleWorkspaceDropdown,
  isWorkspaceDropdownOpen,
  handleSelectWorkspace,
  handleSelectProject, // Add handleSelectProject for project click
}) => {
  const [projects, setProjects] = useState([]);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch all projects for the user
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/projects/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const toggleProjectDropdown = () => {
    setIsProjectDropdownOpen(!isProjectDropdownOpen);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <ul>
        {/* Workspaces Dropdown */}
        <li>
          <button onClick={toggleWorkspaceDropdown} className="dropdown-toggle">
            Workspaces <FaCaretDown />
          </button>
          {isWorkspaceDropdownOpen && (
            <ul className="dropdown-menu">
              {workspaces.map((workspace) => (
                <li key={workspace.id} onClick={() => handleSelectWorkspace(workspace)}>
                  {workspace.name}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Projects Dropdown */}
        <li>
          <button onClick={toggleProjectDropdown} className="dropdown-toggle">
            Projects <FaCaretDown />
          </button>
          {isProjectDropdownOpen && (
            <ul className="dropdown-menu">
              {projects.map((project) => (
                <li
                  key={project.id}
                  onClick={() => handleSelectProject(project)} // Handle project click
                  style={{ cursor: "pointer" }}
                >
                  {project.name}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Reports Option (for Admins) */}
        <li>Reports (Admin Only)</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
