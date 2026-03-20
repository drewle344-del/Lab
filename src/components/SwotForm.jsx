// SwotForm.jsx
// Main multi-step SWOT form wizard
import React, { useState } from 'react';

// --- Step Indicator ---
const stepColors = [
  'text-green-600', // Problem
  'text-green-600', // Strengths
  'text-red-500',   // Weaknesses
  'text-blue-600',  // Opportunities
  'text-orange-500',// Threats
  'text-blue-600',  // Review
];
const circleColors = [
  'bg-green-500',
  'bg-green-500',
  'bg-red-500',
  'bg-blue-500',
  'bg-orange-400',
  'bg-blue-400',
];
function StepIndicator({ current, total }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex gap-3 mb-2">
        {[...Array(total)].map((_, i) => (
          <span
            key={i}
            className={`w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 ${i === current ? `${circleColors[i]} border-transparent` : 'bg-gray-200'}`}
          >
            {i === current && <span className="block w-2 h-2 bg-white rounded-full" />}
          </span>
        ))}
      </div>
    </div>
  );
}

// --- Step 1: Problem Definition ---
function ProblemStep({ problem, setProblem, goal, setGoal, organizationType, setOrganizationType, onNext }) {
  const [touched, setTouched] = useState(false);
  const valid = problem.trim().length > 0;
  return (
    <div className="bg-white rounded-2xl shadow-lg p-10 max-w-2xl mx-auto space-y-6 transition-all duration-200">
      <h2 className="text-3xl font-bold text-center mb-2 text-green-600">Problem Statement</h2>
      <div className="text-gray-600 text-center max-w-md mx-auto mb-6">Please provide a concise description of the primary challenge your organization is currently facing.</div>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Problem Description <span className="text-red-500">*</span></label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 min-h-[70px] focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
            placeholder="E.g., Our organization is experiencing a decline in customer engagement."
            value={problem}
            onChange={e => setProblem(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          <div className="text-xs text-gray-500 mt-1">Please be specific and focus on a single issue (e.g., declining sales, low engagement).</div>
          {touched && !valid && <div className="text-red-500 text-xs mt-1">A problem description is required to proceed.</div>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Desired Outcome</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
            placeholder="E.g., Achieve a 20% increase in sales within the next quarter."
            value={goal}
            onChange={e => setGoal(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Organization Type</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
            value={organizationType}
            onChange={e => setOrganizationType(e.target.value)}
          >
            <option value="">Please select...</option>
            <option>Business</option>
            <option>Nonprofit</option>
            <option>School</option>
            <option>Personal</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          className={`rounded-lg px-6 py-2 bg-green-500 text-white font-semibold transition-all duration-200 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none ${!valid ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={!valid}
          onClick={onNext}
        >Next: Strengths</button>
      </div>
    </div>
  );
}

// --- Reusable Step for SWOT Lists ---
const swotColors = {
  Strengths: 'border-green-500',
  Weaknesses: 'border-red-500',
  Opportunities: 'border-blue-500',
  Threats: 'border-orange-400',
};

function SwotListStep({ title, subtitle, items, setItems, placeholder, onNext, onBack, nextLabel, minRequired = 1 }) {
  const [input, setInput] = useState('');
  const [touched, setTouched] = useState(false);
  const valid = items.length >= minRequired && items.every(i => i.trim().length > 0);
  function addItem() {
    if (input.trim()) {
      setItems([...items, input.trim()]);
      setInput('');
    }
    setTouched(true);
  }
  function removeItem(idx) {
    setItems(items.filter((_, i) => i !== idx));
  }
  return (
    <details open className="swot-section">
      <summary className="swot-heading">{title}</summary>
      <div className="swot-content">
        <div className="text-gray-800 text-center max-w-md mx-auto mb-6">{subtitle}</div>
        <div className="space-y-4 mb-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <span className="flex-1 text-gray-900">{item}</span>
              <button
                className="text-gray-400 hover:text-black transition-all duration-200 text-lg font-bold px-2"
                onClick={() => removeItem(idx)}
                type="button"
                aria-label="Remove"
              >×</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:outline-none transition-all text-black"
            placeholder={placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addItem(); }}
          />
          <button
            className="text-sm font-semibold px-3 py-2 rounded-lg bg-white border border-black hover:underline transition-all duration-200 text-black"
            onClick={addItem}
            type="button"
          >+ Add another</button>
        </div>
        {touched && !valid && (
          <div className="text-red-500 text-xs mb-2">Please enter at least {minRequired} item{minRequired > 1 ? 's' : ''}.</div>
        )}
        <div className="flex justify-between pt-4 gap-3">
          <button
            className="rounded-lg px-4 py-2 bg-gray-200 text-black font-semibold hover:bg-gray-300 transition-all duration-200"
            onClick={onBack}
            type="button"
          >Back</button>
          <button
            className={`rounded-lg px-6 py-2 bg-black text-white font-semibold transition-all duration-200 hover:bg-gray-900 focus:ring-2 focus:ring-black focus:outline-none ${!valid ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={!valid}
            onClick={() => { setTouched(true); if (valid) onNext(); }}
            type="button"
          >{nextLabel}</button>
        </div>
      </div>
    </details>
  );
}

// --- Review Step ---
function ReviewStep({ data, onEdit, onSubmit }) {
  return (
    <details open className="swot-section">
      <summary className="swot-heading">Review Your SWOT Analysis</summary>
      <div className="swot-content">
        <div className="text-gray-800 text-center mb-8">Please review your responses below before proceeding to generate your action plan.</div>
        <div className="mb-8 space-y-4">
          <div className="bg-gray-50 rounded-xl p-5 border border-black">
            <div className="font-semibold text-black mb-1 text-lg">Problem Statement</div>
            <div className="text-gray-900 mb-1">{data.problem}</div>
            {data.goal && <><div className="font-semibold text-black mb-1 text-lg">Desired Outcome</div><div className="text-gray-900 mb-1">{data.goal}</div></>}
            {data.organizationType && <><div className="font-semibold text-black mb-1 text-lg">Organization Type</div><div className="text-gray-900">{data.organizationType}</div></>}
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-black">
            <div className="font-semibold text-black mb-2 text-lg">Strengths</div>
            {data.strengths.length === 0 ? <div className="text-gray-500 italic">No strengths provided.</div> :
              data.strengths.map((s, i) => (
                <div key={i} className="mb-1 text-gray-900">{s}</div>
              ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-black">
            <div className="font-semibold text-black mb-2 text-lg">Weaknesses</div>
            {data.weaknesses.length === 0 ? <div className="text-gray-500 italic">No weaknesses provided.</div> :
              data.weaknesses.map((s, i) => (
                <div key={i} className="mb-1 text-gray-900">{s}</div>
              ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-black">
            <div className="font-semibold text-black mb-2 text-lg">Opportunities</div>
            {data.opportunities.length === 0 ? <div className="text-gray-500 italic">No opportunities provided.</div> :
              data.opportunities.map((s, i) => (
                <div key={i} className="mb-1 text-gray-900">{s}</div>
              ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-black">
            <div className="font-semibold text-black mb-2 text-lg">Threats</div>
            {data.threats.length === 0 ? <div className="text-gray-500 italic">No threats provided.</div> :
              data.threats.map((s, i) => (
                <div key={i} className="mb-1 text-gray-900">{s}</div>
              ))}
          </div>
        </div>
        <div className="flex justify-between mt-8 gap-2">
          <button
            className="rounded-full px-6 py-2 bg-gray-100 text-black font-semibold hover:bg-gray-200 transition-all duration-200"
            onClick={onEdit}
          >Edit Responses</button>
          <button
            className="rounded-full px-6 py-2 bg-black text-white font-semibold transition-all duration-200 hover:bg-gray-900 focus:ring-2 focus:ring-black"
            onClick={onSubmit}
          >Generate Action Plan</button>
        </div>
      </div>
    </details>
  );
}

// --- Main Parent Component ---
export default function SwotForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [problem, setProblem] = useState('');
  const [goal, setGoal] = useState('');
  const [organizationType, setOrganizationType] = useState('');
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [threats, setThreats] = useState([]);

  const stepLabels = [
    'Problem', 'Strengths', 'Weaknesses', 'Opportunities', 'Threats', 'Review'
  ];
  const totalSteps = stepLabels.length;

  function goToStep(idx) {
    setCurrentStep(idx);
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-inter flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-[900px] mx-auto">
        <StepIndicator current={currentStep} total={totalSteps} />
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {currentStep === 0 && (
            <ProblemStep
              problem={problem}
              setProblem={setProblem}
              goal={goal}
              setGoal={setGoal}
              organizationType={organizationType}
              setOrganizationType={setOrganizationType}
              onNext={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 1 && (
            <SwotListStep
              title="Strengths"
              subtitle="Please list the internal attributes and resources that provide your organization with an advantage."
              items={strengths}
              setItems={setStrengths}
              placeholder="E.g., Strong customer loyalty"
              onNext={() => setCurrentStep(2)}
              onBack={() => setCurrentStep(0)}
              nextLabel="Next: Weaknesses"
            />
          )}
          {currentStep === 2 && (
            <SwotListStep
              title="Weaknesses"
              subtitle="Please identify the internal limitations or areas where your organization may be at a disadvantage."
              items={weaknesses}
              setItems={setWeaknesses}
              placeholder="E.g., Limited budget for marketing"
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
              nextLabel="Next: Opportunities"
            />
          )}
          {currentStep === 3 && (
            <SwotListStep
              title="Opportunities"
              subtitle="Please specify the external factors or trends that could benefit your organization."
              items={opportunities}
              setItems={setOpportunities}
              placeholder="E.g., Growing market demand for eco-friendly products"
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
              nextLabel="Next: Threats"
            />
          )}
          {currentStep === 4 && (
            <SwotListStep
              title="Threats"
              subtitle="Please outline the external risks or challenges that could negatively impact your organization."
              items={threats}
              setItems={setThreats}
              placeholder="E.g., Emergence of new competitors"
              onNext={() => setCurrentStep(5)}
              onBack={() => setCurrentStep(3)}
              nextLabel="Review Your SWOT"
            />
          )}
          {currentStep === 5 && (
            <ReviewStep
              data={{ problem, goal, organizationType, strengths, weaknesses, opportunities, threats }}
              onEdit={() => setCurrentStep(0)}
              onSubmit={() => alert('Report generation is temporarily disabled')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
