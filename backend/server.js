require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./config/db');
const { DEFAULT_PORT, DEFAULT_CORS_ORIGINS } = require('./utils/constants');

const app = express();
app.use(cors({ origin: DEFAULT_CORS_ORIGINS }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth',  require('./api/routes/auth.routes'));
app.use('/api/orgs',  require('./api/routes/organization.routes'));
app.use('/api/flags', require('./api/routes/flag.routes'));

require('./api/models/Organization');
require('./api/models/User');
require('./api/models/FeatureFlag');

sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(DEFAULT_PORT, () => console.log(`Server running on port ${DEFAULT_PORT}`));
  })
  .catch((err) => { console.error('Database connection failed:', err.message); process.exit(1); });
