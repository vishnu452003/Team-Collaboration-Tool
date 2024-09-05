import React from "react";

const WorkspaceOverview = ({
  workspaces,
  handleEditWorkspace,
  handleDeleteWorkspace,
  setShowWorkspaceForm,
}) => (
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
);

export default WorkspaceOverview;
