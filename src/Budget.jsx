import { useState, useEffect } from "react";
import axios from "axios";

const Budget = () => {
  const [location, setLocation] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [savedBudgets, setSavedBudgets] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/budget") 
      .then((response) => {
        setSavedBudgets(response.data);
      })
      .catch((error) => console.error("Error fetching budgets:", error));
  }, []);


  const addExpense = (e) => {
    e.preventDefault();

    if (expenseName.trim() !== "" && expenseAmount > 0) {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
      };
      setExpenses([...expenses, newExpense]);
      setExpenseName("");
      setExpenseAmount("");
    } else {
      alert("Please enter a valid expense name and amount.");
    }
  };

  
  const saveBudget = () => {
    if (!location || !totalBudget || expenses.length === 0) {
      alert("Please enter location, total budget, and at least one expense.");
      return;
    }

    const budgetData = {
      location,
      totalBudget: parseFloat(totalBudget),
      expenses,
    };

    axios
      .post("http://localhost:3000/budget", budgetData) // Corrected URL (ensure this is the correct backend endpoint)
      .then((response) => {
        alert("Budget saved successfully!");
        setSavedBudgets([...savedBudgets, response.data.newBudget]);
        setLocation("");
        setTotalBudget("");
        setExpenses([]);
      })
      .catch((error) => console.error("Error saving budget:", error));
  };

  const backgroundImageStyle = {
    backgroundImage: 'url("src/monry.avif")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
  };


  return (
    <div style={backgroundImageStyle} className="buddd">
    <div className="bud">
    <div className="budget-container" >
      <h2>Budget Tracker</h2>

      <div className="input-section">
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="input-section">
        <label>Total Budget:</label>
        <input
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
          required
        />
      </div>

      <form onSubmit={addExpense}>
        <div className="expense-inputs">
          <label>Expense Name:</label>
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />

          <label>Expense Amount:</label>
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="addex">Add Expense</button>
      </form>

      <h3>Expenses</h3>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name}: ₹{expense.amount}
          </li>
        ))}
      </ul>

      <button onClick={saveBudget}  className="saveex">Save Budget</button>

      <h3>Saved Budgets</h3>
      <ul>
        {savedBudgets.map((budget, index) => (
          <li key={index}>
            {budget.location} - ₹{budget.totalBudget} (Expenses: {budget.expenses.length})
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  );
};

export default Budget;
