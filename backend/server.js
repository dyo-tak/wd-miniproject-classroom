require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/user');

// express app
const app = express();

// Enable CORS for all routes (This allows all origins, which can be adjusted as needed)
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// routes
app.use('/api/notes', noteRoutes);
app.use('/api/user', userRoutes);

// connect to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to the database & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error(error);
  });
