const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const connectDB = require('./config/connect');


const app = express();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Uploads folder setup
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/admin', require('./routers/adminRoutes'));
app.use('/api/user', require('./routers/userRoutes'));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
app.get('/', (req, res) => {
  res.send(' Backend server is running');
});
