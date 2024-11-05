import React, { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tasks from the API
    fetch('http://localhost:8000/api/tasks/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setTasks(data))  // Set tasks data in state
      .catch(error => setError(error.message));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Task List</h2>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} style={{ marginBottom: '10px' }}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;