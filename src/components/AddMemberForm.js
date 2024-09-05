import React from "react";

const AddMemberForm = ({
  newMemberUsernames,
  setNewMemberUsernames,
  handleAddMembers,
}) => (
  <div className="add-member-form">
    <h3>Add Members</h3>
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
      </div>
    </form>
  </div>
);

export default AddMemberForm;
