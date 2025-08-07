import React, { useState } from 'react';

function Landing({ onStartChat }) {
  const [affiliation, setAffiliation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (affiliation) {
      onStartChat(affiliation);
    }
  };

  return (
    <div className="landing-container">
      <h1>Political Omegle</h1>
      <p>Debate with someone from the other side.</p>
      <form onSubmit={handleSubmit}>
        <select value={affiliation} onChange={(e) => setAffiliation(e.target.value)}>
          <option value="">Select Your Political Affiliation</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
        <button type="submit">Start Debating</button>
      </form>
    </div>
  );
}

export default Landing;
