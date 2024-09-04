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
  const [showAddMemberForm, setShowAddMemberForm] = useState(true);
  const [newMemberUsernames, setNewMemberUsernames] = useState("");
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [members, setMembers] = useState([]); // State to hold workspace members
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
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setWorkspaces(response.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const handleCreateOrUpdateWorkspace = async (e) => {
    e.preventDefault();
    const workspaceData = { name: workspaceName, description: workspaceDescription };
    try {
      if (editWorkspaceId) {
        await axios.put(`http://localhost:8000/api/workspaces/${editWorkspaceId}/`, workspaceData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setEditWorkspaceId(null);
      } else {
        await axios.post("http://localhost:8000/api/workspaces/", workspaceData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
      }
      fetchWorkspaces();
      resetWorkspaceForm();
    } catch (error) {
      console.error("Error creating/updating workspace:", error);
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    try {
      await axios.delete(`http://localhost:8000/api/workspaces/${workspaceId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      fetchWorkspaces();
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  const handleEditWorkspace = (workspace) => {
    setWorkspaceName(workspace.name);
    setWorkspaceDescription(workspace.description);
    setMembers(workspace.members); // Set workspace members
    setEditWorkspaceId(workspace.id);
    setSelectedWorkspaceId(workspace.id);
    setShowWorkspaceForm(true);
  };

  const handleSelectWorkspace = async (workspace) => {
    setSelectedWorkspaceId(workspace.id);
    setSelectedWorkspace(workspace);
    setMembers(workspace.members); // Set workspace members
  };

  const resetWorkspaceForm = () => {
    setWorkspaceName("");
    setWorkspaceDescription("");
    setEditWorkspaceId(null);
    setShowWorkspaceForm(false);
  };

  const handleAddMembers = async (e) => {
    e.preventDefault();
    const usernames = newMemberUsernames.split(",").map((username) => username.trim());
    try {
      const response = await axios.post(
        `http://localhost:8000/api/workspaces/${selectedWorkspaceId}/add_member/`,
        { usernames },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }
      );
      setShowAddMemberForm(false);
      setNewMemberUsernames("");
      setNotificationMessage(`Members added successfully: ${usernames.join(", ")}`);
      setTimeout(() => setNotificationMessage(""), 3000); // Clear notification after 3 seconds
      fetchWorkspaces(); // Refresh workspaces
    } catch (error) {
      console.error("Error adding members:", error);
      setNotificationMessage("Failed to add members.");
      setTimeout(() => setNotificationMessage(""), 3000); // Clear notification after 3 seconds
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <FaBars onClick={toggleSidebar} className="menu-icon" />
        <h2>DASHBOARD</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
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
                  {workspaces.map((workspace) => (
                    <li key={workspace.id} onClick={() => handleSelectWorkspace(workspace)}>
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
          {notificationMessage && <div className="notification">{notificationMessage}</div>}

          {showWorkspaceForm ? (
            <div className="workspace-form">
              <h2>{editWorkspaceId ? "Edit Workspace" : "Create Workspace"}</h2>
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
                <div className="form-buttons">
                  <button type="submit">{editWorkspaceId ? "Update Workspace" : "Create Workspace"}</button>
                  <button type="button" onClick={resetWorkspaceForm}>
                    Cancel
                  </button>
                </div>
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
                    <div className="form-buttons">
                      <button type="submit">Add Members</button>
                      <button type="button" onClick={() => setShowAddMemberForm(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ) : selectedWorkspace ? (
            <section className="workspace-details">
              <button className="back-button" onClick={() => setSelectedWorkspace(null)}>
                Back
              </button>
              <h2>{selectedWorkspace.name}</h2>
              <p>{selectedWorkspace.description || "No description available."}</p>
              <h3>Members:</h3>
              <ul>
                {members && members.length > 0 ? (
                  members.map((member, index) => <li key={index}>{member}</li>)
                ) : (
                  <li>No members added yet.</li>
                )}
              </ul>
              <div className="workspace-actions">
                <button onClick={() => handleEditWorkspace(selectedWorkspace)}>Edit</button>
                <button onClick={() => handleDeleteWorkspace(selectedWorkspace.id)}>Delete</button>
              </div>
            </section>
          ) : (
            <section className="overview-section">
              <h2>Workspaces</h2>
              <button onClick={() => setShowWorkspaceForm(true)} className="create-workspace-button">
                Create New Workspace
              </button>
              {workspaces.map((workspace) => (
                <div key={workspace.id} className="workspace-item">
                  <span>{workspace.name}</span>
                  <div className="workspace-item-actions">
                    <button onClick={() => handleEditWorkspace(workspace)}>Edit</button>
                    <button onClick={() => handleDeleteWorkspace(workspace.id)}>Delete</button>
                  </div>
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
