import React, { useState, useEffect } from 'react';

const MemorySharing = () => {
  const [memories, setMemories] = useState([]);
  const [memoryInput, setMemoryInput] = useState('');

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    const response = await fetch('/api/memories');
    const data = await response.json();
    setMemories(data);
  };

  const handleInputChange = (e) => {
    setMemoryInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!memoryInput) return;

    const response = await fetch('/api/memories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memory: memoryInput }),
    });

    if (response.ok) {
      setMemoryInput('');
      fetchMemories();
    }
  };

  return (
    <div>
      <h2>Share Your Memories</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={memoryInput}
          onChange={handleInputChange}
          placeholder="Write your memory here..."
          required
        />
        <button type="submit">Share Memory</button>
      </form>
      <h3>Shared Memories</h3>
      <ul>
        {memories.map((memory, index) => (
          <li key={index}>{memory}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemorySharing;
