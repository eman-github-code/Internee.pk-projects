// client/src/components/SubmitForm.jsx
import React, { useState } from 'react';
import api from '../api/api';

export default function SubmitForm({ taskId, onSubmitted }) {
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('task', taskId);
    fd.append('comment', comment);
    Array.from(files).forEach(f => fd.append('files', f));
    const res = await api.post('/intern/submit', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
    onSubmitted(res.data);
  };

  return (
    <form onSubmit={submit}>
      <input type="file" multiple onChange={e => setFiles(e.target.files)} />
      <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Notes..." />
      <button type="submit">Submit</button>
    </form>
  );
}
