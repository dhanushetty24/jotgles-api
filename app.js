const express = require('express');
const app = express();
const { routes } = require('./src/routes/routes');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const { connectDB } = require('./src/config/dBConfig');
require('./src/models/jotgle.schema');
const cors = require('cors');
const helmet = require('helmet');

//Middleware
app.use(express.json());

//CORS
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // If you plan to use cookies later
}));

app.use(helmet());

//Handles routes in the app
app.use('/api', routes);

//connect database and then start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Database connection failed:', err.message));
