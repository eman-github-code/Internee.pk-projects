import React, { useEffect, useState } from 'react';
import API from '../api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await API.get('/projects');
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      {projects.map(p => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>Tags: {p.tags.join(', ')}</p>
          {p.imageUrl && <img src={`http://localhost:5000/uploads/${p.imageUrl}`} alt={p.title} width="200" />}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
