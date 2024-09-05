import React from "react";
import { FaCaretDown } from "react-icons/fa";

const Sidebar = ({
  isSidebarOpen,
  workspaces,
  toggleWorkspaceDropdown,
  isWorkspaceDropdownOpen,
  handleSelectWorkspace,
}) => (
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
);

export default Sidebar;
