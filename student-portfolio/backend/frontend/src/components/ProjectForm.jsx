import React, { useState } from 'react';
import API from '../api';

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('image', image);

    try {
      await API.post('/projects', formData);
      alert('Project uploaded successfully');
      setTitle('');
      setDescription('');
      setTags('');
      setImage(null);
    } catch (err) {
      console.error(err);
      alert('Error uploading project');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;
