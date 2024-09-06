import React from 'react';

const ProjectDetails = ({ project }) => {
  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      
    </div>
  );
};

export default ProjectDetails;
