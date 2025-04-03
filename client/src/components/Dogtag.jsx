import React from 'react';
import '../styles/components/dogtag.css';

const Dogtag = ({ dogtag }) => {
  return (
    <div className="dogtag">
      <p>Collected from: {dogtag.giver_username}</p>
      <p>During event: {dogtag.event_name}</p>
      <p>Date: {new Date(dogtag.created_at).toLocaleDateString()}</p>
    </div>
  );
};


export default Dogtag;
