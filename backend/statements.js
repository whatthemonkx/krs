const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const { createTables } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

createTables();

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
