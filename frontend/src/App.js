import React, { useState, useEffect } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('groceries');
  const [sessionToken, setSessionToken] = useState('');
  const [result, setResult] = useState(null);

  // Initialize secure session on load
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/session/start?user_id=demo_user', { method: 'POST' })
      .then(res => res.json())
      .then(data => setSessionToken(data.session_token))
      .catch(err => console.error("API not running", err));
  }, []);

  const handleAnalyze = async () => {
    if (!sessionToken) return alert("Establishing secure session, please wait...");
    
    const response = await fetch(`http://localhost:8000/api/v1/benefits/unlocker?session_token=${sessionToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: "demo_user",
        purchase_amount: parseFloat(amount),
        merchant_category: category
      })
    });
    
    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>💳 Benefit Intelligence Unlocker</h2>
      <p style={{ fontSize: '12px', color: 'green' }}>✓ Privacy-by-Design Session Active</p>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Purchase Amount ($): </label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          style={{ padding: '5px', width: '100px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '5px' }}>
          <option value="groceries">Groceries</option>
          <option value="travel">Travel</option>
          <option value="dining">Dining</option>
        </select>
      </div>

      <button onClick={handleAnalyze} style={{ padding: '10px 15px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Analyze Benefits
      </button>

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px' }}>
          <h3>AI Analysis Result:</h3>
          <p><strong>Status:</strong> {result.message}</p>
          {result.reward_unlocked && (
            <p style={{ color: 'blue', fontWeight: 'bold' }}>
              Suggested Micro-transaction: +${result.suggested_micro_transaction.toFixed(2)}
            </p>
          )}
          <p style={{ fontSize: '11px', color: 'gray' }}>{result.privacy_status}</p>
        </div>
      )}
    </div>
  );
}

export default App;
