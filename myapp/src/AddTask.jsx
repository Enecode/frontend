import React, { useState } from 'react';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the task object
    const newTask = {
      title,
      description,
      completed,
    };

    try {
      const response = await fetch('http://localhost:8000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setMessage('Task added successfully!');
      setTitle('');          // Clear the title field
      setDescription('');     // Clear the description field
      setCompleted(false);    // Reset the completed status
    } catch (error) {
      setMessage(`Failed to add task: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Completed:
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit">Add Task</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTask;
