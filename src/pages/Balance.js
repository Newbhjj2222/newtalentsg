import React, { useState } from 'react';
import './Balance.css';

const Balance = () => {
  const [activeForm, setActiveForm] = useState(null); // 'purchase' or 'withdraw'
  const [step, setStep] = useState(1);
  const [purchaseData, setPurchaseData] = useState({
    name: '',
    momoName: '',
    phone: '',
    paymentMethod: 'mobile-money',
    plan: 'onestory'
  });

  const [withdrawData, setWithdrawData] = useState({
    name: '',
    phone: '',
    amount: ''
  });

  const handlePurchaseChange = (e) => {
    setPurchaseData({...purchaseData, [e.target.name]: e.target.value});
  };

  const handleWithdrawChange = (e) => {
    setWithdrawData({...withdrawData, [e.target.name]: e.target.value});
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    console.log("Purchase Data:", purchaseData);
    alert("Twakiriye ubusabe bwawe bwo kugura NeS.");
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    console.log("Withdraw Data:", withdrawData);
    alert("Twakiriye ubusabe bwawe bwo kubikuza.");
  };

  return (
    <div className="balance-page">
      <div className="balance-box">
        <h2>Balance Account</h2>
        <div className="balance-details">
          <h3>Account</h3>
          <p>Your balance: <strong>0 RWF</strong></p>
          <p>Nes points: <strong>0 NeS</strong></p>
          <button onClick={() => { setActiveForm('purchase'); setStep(1); }}>Gura NeS</button>
          <button onClick={() => setActiveForm('withdraw')}>Bikuza NeS</button>
        </div>
      </div>

      {activeForm === 'purchase' && (
        <div className="purchase-form">
          <h1>Gura NeS Points</h1>
          <form onSubmit={handlePurchaseSubmit}>
            {step === 1 && (
              <div className="form-step">
                <label>Izina ukoresha kuri uru rubuga:</label>
                <input
                  type="text"
                  name="name"
                  value={purchaseData.name}
                  onChange={handlePurchaseChange}
                  required
                />
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            )}
            {step === 2 && (
              <div className="form-step">
                <label>Izina ribaruye kuri Mobile Money:</label>
                <input
                  type="text"
                  name="momoName"
                  value={purchaseData.momoName}
                  onChange={handlePurchaseChange}
                  required
                />
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            )}
            {step === 3 && (
              <div className="form-step">
                <label>Nimero ya Mobile Money:</label>
                <input
                  type="tel"
                  name="phone"
                  value={purchaseData.phone}
                  onChange={handlePurchaseChange}
                  required
                />
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            )}
            {step === 4 && (
              <div className="form-step">
                <label>Uburyo bwo kwishyura:</label>
                <select
                  name="paymentMethod"
                  value={purchaseData.paymentMethod}
                  onChange={handlePurchaseChange}
                  required
                >
                  <option value="mobile-money">Mobile Money</option>
                </select>
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            )}
            {step === 5 && (
              <div className="form-step">
                <label>Hitamo Plan:</label>
                <select
                  name="plan"
                  value={purchaseData.plan}
                  onChange={handlePurchaseChange}
                  required
                >
                  <option value="onestory">1 Episode (20 RWF)</option>
                  <option value="fivestory">5 Episodes (70 RWF)</option>
                  <option value="tenth">10 Episodes (140 RWF)</option>
                  <option value="weekly">Icyumweru (200 RWF)</option>
                  <option value="monthly">Ukwezi (600 RWF)</option>
                </select>
                <button type="submit">Ohereza</button>
              </div>
            )}
          </form>
        </div>
      )}

      {activeForm === 'withdraw' && (
        <div className="withdraw-form">
          <h1>Bikuza NeS</h1>
          <form onSubmit={handleWithdrawSubmit}>
            <div className="form-step">
              <label>Izina ukoresha kuri uru rubuga:</label>
              <input
                type="text"
                name="name"
                value={withdrawData.name}
                onChange={handleWithdrawChange}
                required
              />
            </div>
            <div className="form-step">
              <label>Nimero yawe ya Mobile Money:</label>
              <input
                type="tel"
                name="phone"
                value={withdrawData.phone}
                onChange={handleWithdrawChange}
                required
              />
            </div>
            <div className="form-step">
              <label>Ingano ya NeS ushaka kubikuza:</label>
              <input
                type="number"
                name="amount"
                value={withdrawData.amount}
                onChange={handleWithdrawChange}
                required
              />
            </div>
            <button type="submit">Ohereza</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Balance;
