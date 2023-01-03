import React, { useState } from 'react';
import './ExpenseTracker.css'; // Import the CSS file

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  const addExpense = event => {
    event.preventDefault();
    setExpenses([...expenses, { description, amount }]);
    setDescription('');
    setAmount(0);
    setBalance(balance + parseInt(amount));
  };

  return (
    <div className="expense-tracker">
      <h1 className="expense-tracker-title">Expense Tracker</h1>
      <div
        className={`balance ${balance >= 0 ? 'positive' : 'negative'}`}
      >
        Balance: {balance}
      </div>
      <form className="expense-form" onSubmit={addExpense}>
        <label className="expense-form-label">
          Description:
          <input
            className="expense-form-input"
            type="text"
            placeholder="Enter a description"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </label>
        <br />
        <label className="expense-form-label">
          Amount:
          <input
            className="expense-form-input"
            type="number"
            value={amount}
            onChange={event => setAmount(event.target.value)}
          />
        </label>
        <br />
        <button className="expense-form-button" type="submit">
          Add Expense
        </button>
      </form>
      <h2 className="expenses-title">Expenses</h2>
      <ul className="expenses-list">
        {expenses.map((expense, index) => (
          <li className={`expense ${expense.amount < 0 ? 'negative' : 'positive'}`} key={index}>
            {expense.description}: {expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;
