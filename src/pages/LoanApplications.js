import React, { useState, useEffect } from 'react';
import './LoanApplications.css';

const LoanApplications = () => {
  const [formData, setFormData] = useState({
    loanType: '',
    loanAmount: '',
    reason: '',
    repaymentPlan: ''
  });
  const [loanHistory, setLoanHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const userLoanHistory = JSON.parse(localStorage.getItem(`loanHistory_${user.username}`)) || [];
    setLoanHistory(userLoanHistory);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loanAmount = parseFloat(formData.loanAmount);
    if (loanAmount < 10000 || loanAmount > 1000000) {
      alert('Loan amount must be between 10,000 and 1,000,000.');
      return;
    }

    const newApplication = {
      date: new Date().toISOString().split('T')[0],
      type: formData.loanType,
      amount: formData.loanAmount,
      reason: formData.reason,
      repaymentPlan: formData.repaymentPlan,
      status: 'Pending',
      remarks: 'Application submitted'
    };

    const userLoanHistory = [...loanHistory, newApplication];
    localStorage.setItem(`loanHistory_${user.username}`, JSON.stringify(userLoanHistory));
    setLoanHistory(userLoanHistory);

    setFormData({
      loanType: '',
      loanAmount: '',
      reason: '',
      repaymentPlan: ''
    });

    alert('Loan application submitted successfully!');
  };

  return (
    <div className="loan-application-container">
      <h2>Loan Application</h2>
      <form onSubmit={handleSubmit} className="loan-application-form">
        <div className="form-group">
          <label>Loan Type</label>
          <select name="loanType" value={formData.loanType} onChange={handleChange} required>
            <option value="">Select type</option>
            <option value="Personal Loan">Personal Loan</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Car Loan">Car Loan</option>
          </select>
        </div>
        <div className="form-group">
          <label>Loan Amount</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            min="10000"
            max="1000000"
            required
          />
        </div>
        <div className="form-group">
          <label>Reason</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Repayment Plan</label>
          <select name="repaymentPlan" value={formData.repaymentPlan} onChange={handleChange} required>
            <option value="">Select repayment plan</option>
            <option value="6 months">6 months</option>
            <option value="12 months">12 months</option>
            <option value="24 months">24 months</option>
          </select>
        </div>
        <button type="submit" className="btn">Submit Application</button>
      </form>

      <h3>Loan History</h3>
      <table className="loan-history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Repayment Plan</th>
            <th>Status</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {loanHistory.length > 0 ? (
            loanHistory.map((loan, index) => (
              <tr key={index}>
                <td>{loan.date}</td>
                <td>{loan.type}</td>
                <td>{loan.amount}</td>
                <td>{loan.reason}</td>
                <td>{loan.repaymentPlan}</td>
                <td>{loan.status}</td>
                <td>{loan.remarks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No loan history found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LoanApplications;
