const express = require('express');

const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json())
const port = process.env.PORT || 3000;



const transactions = require('./routes/transactions')

app.use('/api/v1/transactions', transactions)

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`);
});
/*

const app = express();
const port = process.env.PORT || 3000;

const url = "mongodb+srv://user2:testing12345@expensetracker.abi3jya.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB Atlas');
});

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number
});

const Expense = mongoose.model('Expense', expenseSchema);


app.get('/expenses', (req, res) => {
  res.send("Hello")
  Expense.find((error, expenses) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(expenses);
    }
  });
});

app.post('/expenses', (req, res) => {
  res.send("hii")
  const expense = new Expense(req.body);
  expense.save((error, savedExpense) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(savedExpense);
    }
  });
});

app.delete('/expenses/:id', (req, res) => {
  res.send("kkkkk")
  Expense.findByIdAndDelete(req.params.id, (error, expense) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(expense);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
*/ 