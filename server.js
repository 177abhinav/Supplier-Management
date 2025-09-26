// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const routes = require('./routes');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 8080;

// Create uploads dir if not exists
(async () => {
  await fs.mkdir('./uploads', { recursive: true });
  await fs.mkdir('./uploads/temp', { recursive: true });
})();

// Sync DB
db.sequelize.sync().then(() => {
  console.log('✅ Database synced');
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});