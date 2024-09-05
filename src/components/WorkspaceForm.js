import React from "react";

const WorkspaceForm = ({
  editWorkspaceId,
  workspaceName,
  setWorkspaceName,
  workspaceDescription,
  setWorkspaceDescription,
  handleCreateOrUpdateWorkspace,
  resetWorkspaceForm,
}) => (
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
  </div>
);

export default WorkspaceForm;
