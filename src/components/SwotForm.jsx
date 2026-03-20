// SwotForm.jsx
// Main multi-step SWOT form wizard
import React, { useState } from 'react';
import './SwotForm.css';

// --- Step Indicator ---
function StepIndicator({ current, total }) {
  return (
    <div className="swot-progress">
      {[...Array(total)].map((_, i) => (
        <div
          key={i}
          className={`swot-progress-dot ${i === current ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}

// --- Step 1: Problem Definition ---
function ProblemStep({ problem, setProblem, goal, setGoal, organizationType, setOrganizationType, onNext }) {
  const [touched, setTouched] = useState(false);
  const valid = problem.trim().length > 0;
  return (
    <div className="swot-step-container">
      <h1 className="swot-step-title">Describe the Problem</h1>
      <p className="swot-step-description">Please provide a concise description of the primary challenge your organization is currently facing.</p>
      
      <div className="swot-form-group">
        <label>Problem Description <span className="swot-required">*</span></label>
        <textarea
          className="swot-form-field"
          placeholder="E.g., Our organization is experiencing a decline in customer engagement."
          value={problem}
          onChange={e => setProblem(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        <div className="swot-helper-text">Please be specific and focus on a single issue (e.g., declining sales, low engagement).</div>
        {touched && !valid && <div className="swot-error-text">A problem description is required to proceed.</div>}
      </div>
      
      <div className="swot-form-group">
        <label>Desired Outcome</label>
        <input
          type="text"
          placeholder="E.g., Achieve a 20% increase in sales within the next quarter."
          value={goal}
          onChange={e => setGoal(e.target.value)}
        />
      </div>
      
      <div className="swot-form-group">
        <label>Organization Type</label>
        <select value={organizationType} onChange={e => setOrganizationType(e.target.value)}>
          <option value="">Please select...</option>
          <option>Business</option>
          <option>Nonprofit</option>
          <option>School</option>
          <option>Personal</option>
          <option>Other</option>
        </select>
      </div>
      
      <div className="swot-button-group">
        <button
          className={`swot-btn swot-btn-next ${!valid ? 'swot-btn-next:disabled' : ''}`}
          disabled={!valid}
          onClick={onNext}
        >Next: Strengths</button>
      </div>
    </div>
  );
}

// --- Reusable Step for SWOT Lists ---
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
    <div className="swot-step-container">
      <h1 className="swot-step-title">{title}</h1>
      <p className="swot-step-description">{subtitle}</p>
      
      {items.length > 0 && (
        <div className="swot-item-list">
          {items.map((item, idx) => (
            <div key={idx} className="swot-item">
              <span>{item}</span>
              <button
                className="swot-item-remove"
                onClick={() => removeItem(idx)}
                type="button"
                aria-label="Remove"
              >×</button>
            </div>
          ))}
        </div>
      )}
      
      <div className="swot-form-group">
        <div className="swot-input-group">
          <input
            type="text"
            placeholder={placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addItem(); }}
          />
          <button
            className="swot-btn"
            onClick={addItem}
            type="button"
          >+ Add</button>
        </div>
        {touched && !valid && (
          <div className="swot-error-text">Please enter at least {minRequired} item{minRequired > 1 ? 's' : ''}.</div>
        )}
      </div>
      
      <div className="swot-button-group">
        <button
          className="swot-btn swot-btn-back"
          onClick={onBack}
          type="button"
        >Back</button>
        <button
          className={`swot-btn swot-btn-next ${!valid ? 'swot-btn-next:disabled' : ''}`}
          disabled={!valid}
          onClick={() => { setTouched(true); if (valid) onNext(); }}
          type="button"
        >{nextLabel}</button>
      </div>
    </div>
  );
}

// --- Review Step ---
function ReviewStep({ data, onEdit, onSubmit }) {
  return (
    <div className="swot-step-container">
      <h1 className="swot-step-title">Review Your SWOT Analysis</h1>
      <p className="swot-step-description">Please review your responses below before proceeding to generate your action plan.</p>
      
      <div className="swot-review-content">
        <div className="swot-review-box">
          <h3>Problem Statement</h3>
          <p>{data.problem}</p>
          {data.goal && (
            <>
              <h3>Desired Outcome</h3>
              <p>{data.goal}</p>
            </>
          )}
          {data.organizationType && (
            <>
              <h3>Organization Type</h3>
              <p>{data.organizationType}</p>
            </>
          )}
        </div>
        
        <div className="swot-review-box">
          <h3>Strengths</h3>
          {data.strengths.length === 0 ? (
            <p><em>No strengths provided.</em></p>
          ) : (
            <ul>
              {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          )}
        </div>
        
        <div className="swot-review-box">
          <h3>Weaknesses</h3>
          {data.weaknesses.length === 0 ? (
            <p><em>No weaknesses provided.</em></p>
          ) : (
            <ul>
              {data.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          )}
        </div>
        
        <div className="swot-review-box">
          <h3>Opportunities</h3>
          {data.opportunities.length === 0 ? (
            <p><em>No opportunities provided.</em></p>
          ) : (
            <ul>
              {data.opportunities.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          )}
        </div>
        
        <div className="swot-review-box">
          <h3>Threats</h3>
          {data.threats.length === 0 ? (
            <p><em>No threats provided.</em></p>
          ) : (
            <ul>
              {data.threats.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          )}
        </div>
      </div>
      
      <div className="swot-button-group">
        <button className="swot-btn swot-btn-back" onClick={onEdit}>Edit Responses</button>
        <button className="swot-btn swot-btn-next" onClick={onSubmit}>Generate Action Plan</button>
      </div>
    </div>
  );
}

// --- Main Parent Component ---
export default function SwotForm({ onNext }) {
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

  return (
    <div className="swot-form-container">
      <div className="swot-form-wrapper">
        <StepIndicator current={currentStep} total={totalSteps} />
        
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
            onSubmit={() => onNext && onNext({ problem, goal, organizationType, strengths, weaknesses, opportunities, threats })}
          />
        )}
      </div>
    </div>
  );
}
