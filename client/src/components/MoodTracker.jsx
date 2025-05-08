import React, { useState } from 'react';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [moodEntries, setMoodEntries] = useState([]);

  const handleMoodChange = e => {
    setMood(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (mood) {
      setMoodEntries([...moodEntries, mood]);
      setMood('');
    }
  };

  return (
    <div>
      <h2>Mood Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={mood}
          onChange={handleMoodChange}
          placeholder="How are you feeling?"
        />
        <button type="submit">Add Mood</button>
      </form>
      <ul>
        {moodEntries.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoodTracker;
