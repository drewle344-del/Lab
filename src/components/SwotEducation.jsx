// SwotEducation.jsx
// Main educational component for SWOT Analysis
import React from 'react';
import './SwotEducation.css';

// --- 1. INTRO SECTION ---
function IntroSection() {
  return (
    <details open className="swot-section">
      <summary className="swot-heading">What is SWOT Analysis?</summary>
      <div className="swot-content">
        <p>SWOT analysis is a simple tool used to understand a situation and make better decisions by evaluating strengths, weaknesses, opportunities, and threats.</p>
        <p>It’s used in business, school, and personal decisions to clarify your options and plan your next steps.</p>
      </div>
    </details>
  );
}

// --- 2. SWOT GRID SECTION ---
const swotData = [
  {
    key: 'strengths',
    title: 'Strengths',
    color: 'green',
    definition: 'Internal positives',
    examples: ['Skilled team', 'Strong brand', 'Loyal customers'],
  },
  {
    key: 'weaknesses',
    title: 'Weaknesses',
    color: 'red',
    definition: 'Internal negatives',
    examples: ['Limited resources', 'Lack of experience', 'Weak online presence'],
  },
  {
    key: 'opportunities',
    title: 'Opportunities',
    color: 'blue',
    definition: 'External positives',
    examples: ['Market growth', 'New technology', 'Changing trends'],
  },
  {
    key: 'threats',
    title: 'Threats',
    color: 'orange',
    definition: 'External risks',
    examples: ['New competitors', 'Economic downturn', 'Changing regulations'],
  },
];

function SwotCard({ title, definition, examples }) {
  return (
    <details className="swot-card swot-bw">
      <summary className="swot-heading">{title}</summary>
      <div className="swot-content">
        <p className="swot-def">{definition}</p>
        <ul>
          {examples.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}

function SwotGrid() {
  return (
    <section className="swot-grid-section">
      <div className="swot-grid">
        {swotData.map(card => (
          <SwotCard
            key={card.key}
            title={card.title}
            definition={card.definition}
            examples={card.examples}
          />
        ))}
      </div>
    </section>
  );
}

// --- 3. INTERNAL VS EXTERNAL SECTION ---
function InternalExternalSection() {
  return (
    <details className="swot-section">
      <summary className="swot-heading">Internal vs External</summary>
      <div className="swot-content">
        <p><b>Internal</b> = things you control<br /><b>External</b> = things you cannot control</p>
        <table>
          <tbody>
            <tr><td>Strengths</td><td>Internal</td></tr>
            <tr><td>Weaknesses</td><td>Internal</td></tr>
            <tr><td>Opportunities</td><td>External</td></tr>
            <tr><td>Threats</td><td>External</td></tr>
          </tbody>
        </table>
      </div>
    </details>
  );
}

// --- 4. REAL-WORLD EXAMPLE SECTION ---
function RealWorldExample() {
  return (
    <details className="swot-section">
      <summary className="swot-heading">Example: Small Coffee Shop</summary>
      <div className="swot-content">
        <div className="swot-example-grid">
          <div><b>Scenario:</b> A small coffee shop losing customers</div>
          <div><b>Strengths:</b> Loyal regulars</div>
          <div><b>Weaknesses:</b> Limited marketing</div>
          <div><b>Opportunities:</b> Growing delivery demand</div>
          <div><b>Threats:</b> New competitor nearby</div>
        </div>
      </div>
    </details>
  );
}

// --- 5. HOW TO USE SWOT SECTION ---
function HowToUseSection() {
  return (
    <details className="swot-section">
      <summary className="swot-heading">How to Use SWOT</summary>
      <div className="swot-content">
        <p>Next, you’ll identify a problem and fill out your own SWOT categories.</p>
        <ul>
          <li>Be specific</li>
          <li>Be honest</li>
          <li>Focus on one problem</li>
          <li>Don’t overthink it</li>
        </ul>
      </div>
    </details>
  );
}

// --- 6. OPTIONAL QUIZ SECTION ---
function QuizSection() {
  return (
    <details className="swot-section">
      <summary className="swot-heading">Quick Quiz</summary>
      <div className="swot-content">
        <p>Is <b>"strong brand reputation"</b> internal or external?</p>
        <ul>
          <li>Internal</li>
          <li>External</li>
        </ul>
        <div className="swot-quiz-answer">(Answer: Internal)</div>
      </div>
    </details>
  );
}

// --- 7. NAVIGATION / UX ---
function NextButton({ onNext }) {
  return (
    <div className="swot-next-btn-wrap">
      <button
        className="swot-next-btn"
        onClick={onNext}
      >
        Start Your SWOT Analysis
      </button>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function SwotEducation({ onNext }) {
  return (
    <div className="swot-education">
      <IntroSection />
      <SwotGrid />
      <InternalExternalSection />
      <RealWorldExample />
      <HowToUseSection />
      <QuizSection />
      <NextButton onNext={onNext} />
    </div>
  );
}
