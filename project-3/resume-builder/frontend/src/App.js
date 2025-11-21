import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Project</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/add" element={<ProjectForm />} />
      </Routes>
    </Router>
  );
}

export default App;
