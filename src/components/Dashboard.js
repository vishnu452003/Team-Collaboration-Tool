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
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [editWorkspaceId, setEditWorkspaceId] = useState(null);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMemberUsernames, setNewMemberUsernames] = useState("");
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkspaces();
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
      description: workspaceDescription,
    };
    try {
      if (editWorkspaceId) {
        await axios.put(`http://localhost:8000/api/workspaces/${editWorkspaceId}/`, workspaceData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setEditWorkspaceId(null);
      } else {
        await axios.post("http://localhost:8000/api/workspaces/", workspaceData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
      }
      fetchWorkspaces();
      setShowWorkspaceForm(false);
      setWorkspaceName("");
      setWorkspaceDescription("");
      clearForm(); 
    } catch (error) {
      console.error("Error creating/updating workspace:", error);
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    try {
      await axios.delete(`http://localhost:8000/api/workspaces/${workspaceId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      fetchWorkspaces();
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  const handleEditWorkspace = (workspace) => {
    setWorkspaceName(workspace.name);
    setWorkspaceDescription(workspace.description);
    setEditWorkspaceId(workspace.id);
    setSelectedWorkspaceId(workspace.id);
    setShowWorkspaceForm(true);
  };

  const handleSelectWorkspace = async (workspace) => {
    setSelectedWorkspaceId(workspace.id);
    setSelectedWorkspace(workspace); // Set selected workspace details
  };

  const clearForm = () => {
    setWorkspaceName("");
    setWorkspaceDescription("");
    setEditWorkspaceId(null);
  };

  const handleAddMembers = async (e) => {
    e.preventDefault();
    const usernames = newMemberUsernames.split(',').map(username => username.trim());
    try {
      await axios.post(`http://localhost:8000/api/workspaces/${selectedWorkspaceId}/add_member/`, { usernames }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setShowAddMemberForm(false);
      setNewMemberUsernames("");
      fetchWorkspaces();
    } catch (error) {
      console.error("Error adding members:", error);
    }
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
                    <li key={workspace.id} onClick={() =>handleSelectWorkspace(workspace)}>
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
              {editWorkspaceId && (
                <div className="add-member-form">
                  <h3>Add Members to {workspaceName}</h3>
                  <form onSubmit={handleAddMembers}>
                    <input
                      type="text"
                      value={newMemberUsernames}
                      onChange={(e) => setNewMemberUsernames(e.target.value)}
                      placeholder="Enter usernames separated by commas"
                      required
                    />
                    <button type="submit">Add Members</button>
                    <button type="button" onClick={() => setShowAddMemberForm(false)}>Cancel</button>
                  </form>
                </div>
              )}
            </div>
          ) :selectedWorkspace ? (
            <section className="workspace-details">
              <h2>{selectedWorkspace.name}</h2>
              <p>{selectedWorkspace.description || "No description available."}</p>
              <button onClick={() => handleEditWorkspace(selectedWorkspace)}>Edit</button>
              <button onClick={() => handleDeleteWorkspace(selectedWorkspace.id)}>Delete</button>
            </section>
          ):(
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
