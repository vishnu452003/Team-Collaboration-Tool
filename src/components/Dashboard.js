import React, { useState } from "react";
import "./Dashboard.css"; 
import { FaBars, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

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

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <FaBars onClick={toggleSidebar} className="menu-icon" />
        <h2>DASHBOARD</h2>
        <h2></h2>
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
                  <li>Workspace 1</li>
                  <li>Workspace 2</li>
                  <li>Workspace 3</li>
                </ul>
              )}
            </li>
            <li>Reports (Admin Only)</li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </aside>

        <main className="dashboard-main">
          <section className="overview-section">
            <h2>Overview</h2>
            <div className="widgets">
              <div className="widget">Recent Activity</div>
              <div className="widget">Upcoming Deadlines</div>
            </div>
          </section>

          <section className="tasks-section">
            <h2>Recent Task Highlights</h2>
            <ul>
              <li>Task 1: Project X - Due Date: 09/25</li>
              <li>Task 2: Project Y - Due Date: 09/30</li>
              <li>Task 3: Project Z - Due Date: 09/02</li>
            </ul>
            <button className="view-all-btn">View All Workspaces</button>
          </section>
        </main>
      </div>

     
    </div>
  );
};

export default Dashboard;
