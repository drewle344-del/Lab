// Entry point for the SWOT Education demo
import React, { useState } from 'react';
import SwotEducation from './components/SwotEducation';
import SwotForm from './components/SwotForm';

export default function App() {
  const [phase, setPhase] = useState(1);

  return (
    <div>
      {phase === 1 && <SwotEducation onNext={() => setPhase(2)} />}
      {phase === 2 && <SwotForm onNext={() => setPhase(3)} />}
      {phase === 3 && <div><h2>Your report will appear here</h2></div>}
    </div>
  );
}
