// SwotReport.jsx - Displays the generated SWOT strategy report
import React, { useEffect, useState } from 'react';

export default function SwotReport({ swotData, onRestart }) {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/generate-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(swotData),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Frontend received:", data);
        setReport(data.report);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [swotData]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #7da2b8, #c7d2d9)", fontFamily: "Inter, Segoe UI, Arial, sans-serif", padding: "2rem 0" }}>
      <div style={{ maxWidth: 800, margin: "40px auto 0 auto", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.1)", padding: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 24, color: "#22c55e" }}>Your SWOT Strategy Report</h1>
        
        {loading && (
          <div style={{ textAlign: "center", fontSize: 18, padding: "48px 0" }}>
            ⏳ Generating your strategy report...
          </div>
        )}
        
        {error && (
          <div style={{ textAlign: "center", color: "#ef4444", padding: "48px 0", fontSize: 16 }}>
            ❌ Error generating report. Make sure Ollama is running.
          </div>
        )}
        
        {!loading && !error && (
          <div>
            {/* Problem Statement */}
            <details open style={{ marginBottom: 16 }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, color: "#22c55e", marginBottom: 8 }}>📋 Problem Statement</summary>
              <div style={{ paddingLeft: 16, color: "#333" }}>{swotData.problem}</div>
            </details>

            {/* Goal */}
            {swotData.goal && (
              <details open style={{ marginBottom: 16 }}>
                <summary style={{ cursor: "pointer", fontWeight: 600, color: "#22c55e", marginBottom: 8 }}>🎯 Desired Outcome</summary>
                <div style={{ paddingLeft: 16, color: "#333" }}>{swotData.goal}</div>
              </details>
            )}

            {/* Organization Type */}
            {swotData.organizationType && (
              <details open style={{ marginBottom: 16 }}>
                <summary style={{ cursor: "pointer", fontWeight: 600, color: "#22c55e", marginBottom: 8 }}>🏢 Organization Type</summary>
                <div style={{ paddingLeft: 16, color: "#333" }}>{swotData.organizationType}</div>
              </details>
            )}

            {/* Strengths */}
            <details open style={{ marginBottom: 16 }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, color: "#22c55e", marginBottom: 8 }}>💪 Strengths</summary>
              <div style={{ paddingLeft: 16, color: "#333" }}>
                {swotData.strengths.length === 0 ? (
                  <em>No strengths provided.</em>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {swotData.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                )}
              </div>
            </details>

            {/* Weaknesses */}
            <details open style={{ marginBottom: 16 }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, color: "#ef4444", marginBottom: 8 }}>⚠️ Weaknesses</summary>
              <div style={{ paddingLeft: 16, color: "#333" }}>
                {swotData.weaknesses.length === 0 ? (
                  <em>No weaknesses provided.</em>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {swotData.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                )}
              </div>
            </details>

            {/* Opportunities */}
            <details open style={{ marginBottom: 16 }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, color: "#3b82f6", marginBottom: 8 }}>✨ Opportunities</summary>
              <div style={{ paddingLeft: 16, color: "#333" }}>
                {swotData.opportunities.length === 0 ? (
                  <em>No opportunities provided.</em>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {swotData.opportunities.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                )}
              </div>
            </details>

            {/* Threats */}
            <details open style={{ marginBottom: 16 }}>
              <summary style={{ cursor: "pointer", fontWeight: 600, color: "#f59e42", marginBottom: 8 }}>🎲 Threats</summary>
              <div style={{ paddingLeft: 16, color: "#333" }}>
                {swotData.threats.length === 0 ? (
                  <em>No threats provided.</em>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {swotData.threats.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                )}
              </div>
            </details>

            {/* AI-Generated Action Plan */}
            {report && (
              <details open style={{ marginBottom: 24 }}>
                <summary style={{ cursor: "pointer", fontWeight: 600, color: "#22c55e", marginBottom: 8 }}>🚀 AI-Generated Action Plan</summary>
                <div style={{ paddingLeft: 16, color: "#333", whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: 14, lineHeight: 1.6, backgroundColor: "#f9fafb", padding: 12, borderRadius: 8 }}>
                  {report}
                </div>
              </details>
            )}

            {/* Restart Button */}
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button 
                onClick={onRestart}
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "white",
                  border: "none",
                  padding: "12px 32px",
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                🔄 Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
