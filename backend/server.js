const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 5000;
const app = express();

// DB connection
connectDB();

// Routes
app.use(express.json());
app.use('/api/user', userRoutes);
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server is running on ${PORT}`));
