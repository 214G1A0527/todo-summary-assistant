import React from 'react';

const SummaryButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ padding: '0.5rem', marginTop: '1rem' }}>
      Summarize and Send to Slack
    </button>
  );
};

export default SummaryButton;