const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const usersRoutes = require('../server/routes/users');
const productRoutes = require('../server/routes/products');
const ordersRoutes = require('../server/routes/orders');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Require and register the models
require('./models/User');
require('./models/Product');
require('./models/Order');

// Initialize Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Set up API routes
app.use('/api/users', usersRoutes);
app.use('/api/products', productRoutes);
app.use('/api/order', ordersRoutes);
// ... add other routes here

// Placeholder route
app.get('/', (req, res) => {
  res.send('Hello from the MERN backend.');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
