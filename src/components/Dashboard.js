import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { FaBars, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [showWorkspaceForm, setShowWorkspaceForm] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState(""); // New state for description
  const [workspaces, setWorkspaces] = useState([]);
  const [editWorkspaceId, setEditWorkspaceId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkspaces(); // Fetch workspaces on component mount
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleWorkspaceDropdown = () => {
    setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const fetchWorkspaces = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/workspaces/", {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setWorkspaces(response.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const handleCreateOrUpdateWorkspace = async (e) => {
    e.preventDefault();
    const workspaceData = { 
      name: workspaceName,
      description: workspaceDescription, // Include description
    };
    try {
      if (editWorkspaceId) {
        // Update existing workspace
        await axios.put(`http://localhost:8000/api/workspaces/${editWorkspaceId}/`, workspaceData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setEditWorkspaceId(null); // Reset edit mode
      } else {
        // Create new workspace
        await axios.post("http://localhost:8000/api/workspaces/", workspaceData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
      }
      fetchWorkspaces(); // Refresh the list of workspaces
      setShowWorkspaceForm(false);
      setWorkspaceName("");
      setWorkspaceDescription(""); // Clear description
    } catch (error) {
      console.error("Error creating/updating workspace:", error);
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    try {
      await axios.delete(`http://localhost:8000/api/workspaces/${workspaceId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      fetchWorkspaces(); // Refresh the list of workspaces
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  const handleEditWorkspace = (workspace) => {
    setWorkspaceName(workspace.name);
    setWorkspaceDescription(workspace.description); // Set description
    setEditWorkspaceId(workspace.id);
    setShowWorkspaceForm(true);
  };

  const clearForm = () => {
    setWorkspaceName("");
    setWorkspaceDescription(""); // Clear description
    setEditWorkspaceId(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <FaBars onClick={toggleSidebar} className="menu-icon" />
        <h2>DASHBOARD</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-content">
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <ul>
            <li>
              <button onClick={toggleWorkspaceDropdown} className="dropdown-toggle">
                Workspaces <FaCaretDown />
              </button>
              {isWorkspaceDropdownOpen && (
                <ul className="dropdown-menu">
                  {workspaces.map(workspace => (
                    <li key={workspace.id} onClick={() => handleEditWorkspace(workspace)}>
                      {workspace.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>Reports (Admin Only)</li>
          </ul>
        </aside>

        <main className="dashboard-main">
          {showWorkspaceForm ? (
            <div className="workspace-form">
              <h2>{editWorkspaceId ? 'Edit Workspace' : 'Create Workspace'}</h2>
              <form onSubmit={handleCreateOrUpdateWorkspace}>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Workspace Name"
                  required
                />
                <textarea
                  value={workspaceDescription}
                  onChange={(e) => setWorkspaceDescription(e.target.value)}
                  placeholder="Workspace Description (optional)"
                />
                <button type="submit">{editWorkspaceId ? 'Update Workspace' : 'Create Workspace'}</button>
                <button type="button" onClick={clearForm}>Cancel</button>
              </form>
            </div>
          ) : (
            <section className="overview-section">
              <h2>Workspaces</h2>
              <button onClick={() => setShowWorkspaceForm(true)} className="create-workspace-button">Create New Workspace</button>
              {workspaces.map(workspace => (
                <div key={workspace.id} className="workspace-item">
                  <span>{workspace.name}</span>
                  <button onClick={() => handleEditWorkspace(workspace)}>Edit</button>
                  <button onClick={() => handleDeleteWorkspace(workspace.id)}>Delete</button>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
