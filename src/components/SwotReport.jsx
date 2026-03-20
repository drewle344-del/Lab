// SwotReport.jsx - Displays the generated SWOT strategy report
import React, { useEffect, useState } from 'react';
// Use fetch for backend call


import React, { useEffect, useState } from 'react';

export default function SwotReport({ swotData, onRestart }) {
  const [report, setReport] = useState("Report generation is temporarily disabled.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/generate-report", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(swotData),
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("Frontend received:", data);
  //       setReport(data.report);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       setError(true);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Inter, Segoe UI, Arial, sans-serif", padding: "2rem 0" }}>
      <div style={{ maxWidth: 900, margin: "40px auto 0 auto", background: "#fff", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", padding: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 24 }}>Your SWOT Strategy Report</h1>
        {loading && <div style={{ textAlign: "center", fontSize: 18, padding: "48px 0" }}>Generating your strategy report...</div>}
        {error && <div style={{ textAlign: "center", color: "#ef4444", padding: "48px 0" }}>Error generating report. Please try again.</div>}
        {!loading && !error && report && (
          <ReportDropdownSections text={report} />
        )}
        // Render report as dropdown sections with black/white style
        function ReportDropdownSections({ text }) {
          // Split report into sections by headings (e.g., numbered or titled)
          const lines = text.split(/\r?\n/);
          let section = null;
          let buffer = [];
          const sections = [];
          return (
            <div className="swot-section">
              <h1 className="swot-heading mb-4">Your SWOT Analysis Report</h1>
              <div className="swot-content">
                <details open className="swot-section">
                  <summary className="section-title">Problem Statement</summary>
                  <div className="swot-content">{swotData.problem}</div>
                </details>
                {swotData.goal && (
                  <details className="swot-section">
                    <summary className="section-title">Desired Outcome</summary>
                    <div className="swot-content">{swotData.goal}</div>
                  </details>
                )}
                {swotData.organizationType && (
                  <details className="swot-section">
                    <summary className="section-title">Organization Type</summary>
                    <div className="swot-content">{swotData.organizationType}</div>
                  </details>
                )}
                <details open className="swot-section">
                  <summary className="section-title">Strengths</summary>
                  <div className="swot-content">
                    {swotData.strengths.length === 0 ? <span className="text-gray-500 italic">No strengths provided.</span> :
                      <ul>{swotData.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>}
                  </div>
                </details>
                <details open className="swot-section">
                  <summary className="section-title">Weaknesses</summary>
                  <div className="swot-content">
                    {swotData.weaknesses.length === 0 ? <span className="text-gray-500 italic">No weaknesses provided.</span> :
                      <ul>{swotData.weaknesses.map((s, i) => <li key={i}>{s}</li>)}</ul>}
                  </div>
                </details>
                <details open className="swot-section">
                  <summary className="section-title">Opportunities</summary>
                  <div className="swot-content">
                    {swotData.opportunities.length === 0 ? <span className="text-gray-500 italic">No opportunities provided.</span> :
                      <ul>{swotData.opportunities.map((s, i) => <li key={i}>{s}</li>)}</ul>}
                  </div>
                </details>
                <details open className="swot-section">
                  <summary className="section-title">Threats</summary>
                  <div className="swot-content">
                    {swotData.threats.length === 0 ? <span className="text-gray-500 italic">No threats provided.</span> :
                      <ul>{swotData.threats.map((s, i) => <li key={i}>{s}</li>)}</ul>}
                  </div>
                </details>
                {report && (
                  <details open className="swot-section">
                    <summary className="section-title">AI-Generated Action Plan</summary>
                    <div className="swot-content whitespace-pre-line">
                      {loading ? <span>Loading...</span> : report}
                    </div>
                  </details>
                )}
                <div className="flex justify-end mt-8">
                  <button className="swot-next-btn" onClick={onRestart}>Start Over</button>
                </div>
              </div>
            </div>
          );
