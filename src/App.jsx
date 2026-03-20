// Entry point for the SWOT Education demo
import React, { useState } from 'react';
import SwotEducation from './components/SwotEducation';
import SwotForm from './components/SwotForm';
import SwotReport from './components/SwotReport';

export default function App() {
  const [phase, setPhase] = useState(1);
  const [swotData, setSwotData] = useState(null);

  return (
    <div>
      {phase === 1 && <SwotEducation onNext={() => setPhase(2)} />}
      {phase === 2 && <SwotForm onNext={(data) => { setSwotData(data); setPhase(3); }} />}
      {phase === 3 && swotData && <SwotReport swotData={swotData} onRestart={() => { setPhase(1); setSwotData(null); }} />}
    </div>
  );
}
