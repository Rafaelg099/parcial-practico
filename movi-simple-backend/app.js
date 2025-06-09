const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const routeRoutes = require('./routes/routeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/route', routeRoutes);

module.exports = app;
