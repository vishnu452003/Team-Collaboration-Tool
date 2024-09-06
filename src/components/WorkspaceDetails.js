import React from "react";

const WorkspaceDetails = ({
  selectedWorkspace,
  members,
  setSelectedWorkspace,
}) => (
  <section className="workspace-details">
    <button  onClick={() => setSelectedWorkspace(null)}>
      Back
    </button>
    <h2>{selectedWorkspace.name}</h2>
    <p>{selectedWorkspace.description || "No description available."}</p>
    <h3>Members</h3>
    <ul>
      {members.length > 0 ? members.map((member, index) => <li key={index}>{member}</li>) : <li>No members added yet.</li>}
    </ul>
    
  </section>
);

export default WorkspaceDetails;
