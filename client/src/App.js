import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await axios.get("/api/v1/transactions")
        const data = response.data.data
        console.log(data)
        setExpenses(data);
        setBalance(data.reduce((total, expense) => total + expense.amount, 0));
      } catch (error) {
        console.log(error);
      }
    }
    fetchExpenses();
  }, []);

  async function addExpense(event) {
    event.preventDefault();
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      
      }
      
      const response = await axios.post("/api/v1/transactions/", {text, amount}, config)
      const data = response.data.data
      console.log(data)
      setExpenses([...expenses, data]);
      setBalance(balance + data.amount);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteExpense(id) {
    try {
      
      const response = await axios.delete(`/api/v1/transactions/${id}`);
      const data = response.data.data
      console.log(data)
      setExpenses(expenses.filter(expense => expense._id !== id));
      setBalance(balance - data.amount);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>
      <p className="balance">Balance: {balance}</p>
      <form onSubmit={addExpense}>
        <div className="expense-form">
          <input
            type="text"
            placeholder="Description"
            value={text}
            onChange={event => setText(event.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={event => setAmount(parseInt(event.target.value))}
          />
          <button type="submit">Add Expense</button>
        </div>
      </form>
      <h2>Expenses</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense._id} className={expense.amount > 0 ? 'positive' : 'negative'}>
            <span>{expense.text}</span>
            <span>{expense.amount}</span>
            <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ExpenseTracker;