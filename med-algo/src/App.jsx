import { useState } from "react";

const medications = [
  { name: "Tirzepatide, Semaglutide, Liraglutide", conditions: ["Are you pregnant?", "Do you have thyroid problems?", "Family or Personal history MTC"] },
  { name: "Phentermine", conditions: ["Do you have high blood pressure?", "Do you have glaucoma?", "Do you have thyroid problems?"] },
  { name: "Topiramate", conditions: ["Are you pregnant?"] },
  { name: "Naltrexone", conditions: ["Do you use opioids?"] },
  { name: "Bupropion", conditions: ["Do you have seizures?"] },
  { name: "Orlistat", conditions: ["Do you have gallstones?", "Are you pregnant?", "Malabsorption"] },
];

const allMeds = [
  "Tirzepatide", "Semaglutide", "Dulaglutide", "Liraglutide", "Phentermine", "Bupropion", "Naltrexone", "Orlistat", "Oral Semaglutide", "SGLPTi", "Metformin", "Topiramate"
];

const questions = [
  "Are you pregnant?",
  "Do you have high blood pressure?",
  "Do you have glaucoma?",
  "Do you have thyroid problems?",
  "Do you have seizures?",
  "Do you have gallstones?",
  "Do you use opioids?",
];

export default function MedChecker() {
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState({ medsToAvoid: [], medsThatWork: [] });

  const handleChange = (question) => {
    setResponses({ ...responses, [question]: !responses[question] });
  };

  const checkMeds = () => {
    const medsToAvoid = medications.filter(med =>
      med.conditions.some(cond => responses[cond])
    ).map(med => med.name);
    
    const medsThatWork = allMeds.filter(med => !medsToAvoid.includes(med));
    
    setResult({ medsToAvoid, medsThatWork });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Medication Checker</h1>
      <form>
        {questions.map((q) => (
          <label key={q} style={{ display: "block", marginBottom: "5px" }}>
            <input type="checkbox" checked={responses[q] || false} onChange={() => handleChange(q)} /> {q}
          </label>
        ))}
      </form>
      <button style={{ marginTop: "10px", padding: "10px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={checkMeds}>
        Check Medications
      </button>
      {result.medsToAvoid.length > 0 && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Avoid These Medications:</h2>
          <ul>
            {result.medsToAvoid.map((med, index) => (
              <li key={index}>{med}</li>
            ))}
          </ul>
        </div>
      )}
      {result.medsThatWork.length > 0 && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#e6ffe6" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Medications That Can Work:</h2>
          <ul>
            {result.medsThatWork.map((med, index) => (
              <li key={index}>{med}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
