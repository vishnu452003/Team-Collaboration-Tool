import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import WorkspaceForm from "./WorkspaceForm";
import WorkspaceDetails from "./WorkspaceDetails";
import AddMemberForm from "./AddMemberForm";
import Notification from "./Notification";
import WorkspaceOverview from "./WorkspaceOverview";
import ProjectList from "./ProjectList";  // Import ProjectList
import CreateProjectForm from "./CreateProjectForm";  // Import CreateProjectForm
import "./Dashboard.css";
import ProjectDetails from "./ProjectDetails";


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [showWorkspaceForm, setShowWorkspaceForm] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [editWorkspaceId, setEditWorkspaceId] = useState(null);
  const [newMemberUsernames, setNewMemberUsernames] = useState("");
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [members, setMembers] = useState([]);
  const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  

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
    setMembers(workspace.members);
    setEditWorkspaceId(workspace.id);
    setSelectedWorkspaceId(workspace.id);
    setShowWorkspaceForm(true);
  };

  const handleSelectWorkspace = (workspace) => {
    setSelectedWorkspaceId(workspace.id);
    setSelectedWorkspace(workspace);
    setMembers(workspace.members);
    setSelectedProject(null);//change
    
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
      await axios.post(
        `http://localhost:8000/api/workspaces/${selectedWorkspaceId}/add_member/`,
        { usernames },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }
      );
     
      setNewMemberUsernames("");
      setNotificationMessage(`Members added successfully: ${usernames.join(", ")}`);
      setTimeout(() => setNotificationMessage(""), 3000);
      fetchWorkspaces();
    } catch (error) {
      console.error("Error adding members:", error);
      setNotificationMessage("Failed to add members.");
      setTimeout(() => setNotificationMessage(""), 3000);
    }
  };

  const handleSelectProject = async (project) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/projects/${project.id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setSelectedProject(response.data);  // Update the selected project state
    } catch (error) {
      console.error("Error fetching project details:", error);
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
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          workspaces={workspaces}
          toggleWorkspaceDropdown={toggleWorkspaceDropdown}
          isWorkspaceDropdownOpen={isWorkspaceDropdownOpen}
          handleSelectWorkspace={handleSelectWorkspace}
          handleSelectProject={handleSelectProject} // Pass 
          
        />

        <main className="dashboard-main">
          <Notification notificationMessage={notificationMessage} />

          {showWorkspaceForm ? (
            <>
              <WorkspaceForm
                editWorkspaceId={editWorkspaceId}
                workspaceName={workspaceName}
                setWorkspaceName={setWorkspaceName}
                workspaceDescription={workspaceDescription}
                setWorkspaceDescription={setWorkspaceDescription}
                handleCreateOrUpdateWorkspace={handleCreateOrUpdateWorkspace}
                resetWorkspaceForm={resetWorkspaceForm}
              />
              {editWorkspaceId && (
                <AddMemberForm
                  newMemberUsernames={newMemberUsernames}
                  setNewMemberUsernames={setNewMemberUsernames}
                  handleAddMembers={handleAddMembers}
                />
              )}
            </>
          ) :
           selectedProject ? (
            <ProjectDetails project={selectedProject} /> // Show project details when selected
          ):
          selectedWorkspace ? (
            <>
              <WorkspaceDetails
                selectedWorkspace={selectedWorkspace}
                members={members}
                handleEditWorkspace={handleEditWorkspace}
                handleDeleteWorkspace={handleDeleteWorkspace}
                setSelectedWorkspace={setSelectedWorkspace}
              />
               <button 
                className="create-project-button" 
                onClick={() => setShowCreateProjectForm(!showCreateProjectForm)}
              >
                {showCreateProjectForm ? "Cancel" : "Create Project in this Workspace"}
              </button>

              {showCreateProjectForm && (
                <CreateProjectForm
                  workspaceId={selectedWorkspace.id}
                  fetchProjects={fetchWorkspaces} 
                />
              )}

              <ProjectList workspaceId={selectedWorkspace.id} />
             
            </>
          ) : (
            <WorkspaceOverview
              workspaces={workspaces}
              handleEditWorkspace={handleEditWorkspace}
              handleDeleteWorkspace={handleDeleteWorkspace}
              setShowWorkspaceForm={setShowWorkspaceForm}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
