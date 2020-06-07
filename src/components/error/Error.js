import React from 'react';

export default function Error(props) {
  return (
    <div>
      This page is temporarly unavailable
      <button
        onClick={() => {
          props.history.push('/');
        }}>
        GO back to Home Page
      </button>
    </div>
  );
}
